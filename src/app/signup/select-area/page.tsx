'use client';

import AreaCard from '@/components/area-card';
import { areaData } from '@/data/area-data';
import SignButton from '@/features/sign/components/sign-button';
import { useAuthEmailStore } from '@/store/auth-Email-store';
import { AreaType } from '@/types/area-data-type';
import { createClient } from '@/utils/supabase/client';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

function SelectAreaPage() {
  const { saveArea, userId, userEmail, userSelectedArea, userPassword } =
    useAuthEmailStore((s) => s);
  const supabase = createClient();
  const router = useRouter();

  const [areas, setAreas] = useState<AreaType[]>(areaData);

  const handleSubmit = async () => {
    if (!userEmail || !userPassword) {
      toast.error('이메일 또는 비밀번호를 확인하세요');
      return;
    }

    const areaData = areas.filter((area) => area.isSelected);

    if (!areaData.length) {
      toast.error('최소 1개 이상의 지역을 선택하세요.');
      return;
    }

    const userArea = areaData.map((data) => data.name);

    saveArea({ userSelectedArea: userArea });

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: userEmail.toLowerCase().trim(),
        password: userPassword.trim(),
      });

      if (authError) {
        throw new Error('올바른 가입 정보가 아닙니다. :', authError);
      }

      const { error: insertError } = await supabase
        .from('userinfo')
        .insert([
          {
            user_id: data.user?.id,
            nickname: userId,
            email: userEmail.trim(),
            interested_area: userSelectedArea,
          },
        ])
        .select();

      if (insertError) {
        throw new Error('다음과 같은 오류가 발생하였습니다.', insertError);
      }

      toast.success('회원가입 성공');
      router.push('/signin');
    } catch (error) {
      console.error(error);
      toast.error('로그인 실패');
      router.push('/signup/email');
    }
  };

  return (
    <motion.div
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

export default SelectAreaPage;
