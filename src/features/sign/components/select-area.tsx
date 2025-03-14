'use client';

import { motion } from 'framer-motion';
import SignButton from './sign-button';
import { toast } from 'react-toastify';
import AreaCard from '@/components/area-card';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AreaType } from '@/types/area-data-type';
import { getUser } from '@/app/api/get-user';
import { useAuthStore } from '@/store/auth-store';

function SelectArea({ areaData }: { areaData: AreaType[] }) {
  const { saveAuth, type, userId, userNickname, userEmail } = useAuthStore(
    (s) => s
  );
  const [areas, setAreas] = useState(areaData);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    try {
      // 이메일로 가입했을 시 바로 종료되도록
      if (type === 'email') return;

      async function saveUser() {
        const user = await getUser();
        if (!user) throw new Error('user 정보가 없습니다.');

        const userData = {
          type: 'kakao' as const,
          userId: user.data.user?.id,
          userEmail: user.data.user?.email,
          userNickname: user.data.user?.email?.split('@').at(0),
        };

        saveAuth(userData);
        console.log(useAuthStore.getState());
      }
      saveUser();
    } catch (err) {
      if ((err as string).includes('duplicate')) {
        toast.error('중복된 닉네임입니다.');
      }
      console.error(err);
    }
  }, []);

  const handleSubmit = async () => {
    const areaData = areas.filter((area) => area.isSelected);

    if (areaData.length === 0) {
      toast.error('최소 1개 이상의 지역을 선택하세요.');
      return;
    }

    const userArea = areaData.map((data) => data.name);

    saveAuth({ userSelectedArea: userArea });

    try {
      const { error: insertError } = await supabase
        .from('userinfo')
        .insert([
          {
            user_id: userId,
            nickname: userNickname,
            email: userEmail,
            interested_area: useAuthStore.getState().userSelectedArea,
          },
        ])
        .select();

      if (insertError) {
        console.error(insertError);
        throw new Error('에러가 발생하였습니다');
      }

      toast.success('회원가입 성공');
      router.push('/feed');
    } catch {
      toast.error('로그인 실패');
      router.push('/signup/email');
    }
  };

  return (
    <motion.div
      key={'selectArea'}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <section className="py-7 w-[18.875rem] mx-auto">
        <h1 className="text-white text-center font-semibold">관심 지역 설정</h1>
        <p className="text-white font-semibold text-xs my-4">
          📌 관심 있는 지역을 설정해주세요. (최대 3개)
        </p>
        <ul className="grid grid-cols-3 gap-4">
          {areas.map((area) => (
            <li key={area.name}>
              <AreaCard area={area} areas={areas} setAreas={setAreas} />
            </li>
          ))}
        </ul>
        <SignButton
          label="회원가입"
          color="white"
          className="w-full mt-8"
          onClick={handleSubmit}
        />
      </section>
    </motion.div>
  );
}

export default SelectArea;
