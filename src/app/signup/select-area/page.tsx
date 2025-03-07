'use client';

import AreaCard from '@/components/area-card';
import { areaData } from '@/data/area-data';
import SignButton from '@/features/sign/components/sign-button';
import { AreaType } from '@/types/area-data-type';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { toast } from 'react-toastify';

function SelectAreaPage() {
  const [areas, setAreas] = useState<AreaType[]>(areaData);

  const handleSubmit = () => {
    const areaData = areas.filter((area) => area.isSelected);

    if (!areaData.length) {
      toast.error('최소 1개 이상의 지역을 선택하세요.');
      return;
    }

    console.log(areaData);
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
        <article className="grid grid-cols-3 gap-4">
          {areas.map((area) => (
            <AreaCard
              key={area.name}
              area={area}
              areas={areas}
              setAreas={setAreas}
            />
          ))}
        </article>
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
