'use client';

import formatDate from '@/utils/format-date';
import { useEffect, useState } from 'react';

interface SubscriptDayProps {
  createdAt?: string;
}

function SubscriptDay({ createdAt }: SubscriptDayProps) {
  const [subsDay, setSubsDay] = useState('');

  useEffect(() => {
    if (createdAt) {
      const date = formatDate(createdAt);
      setSubsDay(date);
    }
  }, [createdAt]);

  return (
    <p className="border-solid border-b-[0.2px] border-gray-400 mx-3 pt-[20px] mb-[88px] text-white">
      가입 일자 {subsDay || ''}
    </p>
  );
}

export default SubscriptDay;
