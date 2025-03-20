'use client';

import AreaCard from '@/components/area-card';
import { areaData } from '@/data/area-data';
import SignButton from '@/features/sign/components/sign-button';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function ModifyArea() {
  const supabase = createClient();
  const router = useRouter();
  const [areas, setAreas] = useState(areaData);
  const [user, setUser] = useState<string>();

  const clickedAreas = areas.filter((area) => area.isSelected);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();

      if (userError) {
        console.error(userError);
      }

      setUser(user.user?.id);
    };

    fetchUser();
  }, []);

  const handleModify = async () => {
    const { error } = await supabase
      .from('userinfo')
      .update({
        interested_area: clickedAreas.map((area) => area.name),
      })
      .eq('user_id', user)
      .select();

    if (error) {
      console.error(error);
      return;
    }

    router.push('/recommend-place');
  };

  return (
    <section className="py-7 w-full px-1 mx-auto bg-black">
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
        label="수정완료"
        color="white"
        className="w-full mt-8"
        onClick={handleModify}
      />
    </section>
  );
}

export default ModifyArea;
