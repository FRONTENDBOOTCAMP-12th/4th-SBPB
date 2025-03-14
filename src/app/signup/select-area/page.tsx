import { areaData } from '@/data/area-data';
import SelectArea from '@/features/sign/components/select-area';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '관심지역 선택',
};

function SelectAreaPage() {
  return <SelectArea areaData={areaData} />;
}

export default SelectAreaPage;
