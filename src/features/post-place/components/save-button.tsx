import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { tm } from '@/utils/tw-merge';
import { usePlacesStore } from '@/store/user-place-store';

// interface Place {
//   category_group_name: string;
//   place_name: string;
//   road_address_name: string;
// }

function SaveButton({
  targetPath,
  disabled,
}: {
  targetPath: string;
  disabled: boolean;
}) {
  const { places } = usePlacesStore();
  const router = useRouter();

  const handleSave = () => {
    if (disabled) {
      return;
    }

    if (places.length === 0) {
      alert('저장할 장소를 선택해주세요!');
      return;
    }

    const query = new URLSearchParams({
      places: JSON.stringify(places),
    }).toString();
    const url = `${targetPath}?${query}`;

    router.push(url);
  };

  if (disabled) {
    return (
      <div className="w-full flex items-center justify-center gap-[7px] h-[46px] rounded-lg bg-gray-400">
        <span className="text-xs text-white">장소를 검색하고 선택하세요</span>
      </div>
    );
  }

  return (
    <button
      type="submit"
      title="저장하기"
      aria-label="저장하기"
      className={tm(
        'w-full',
        'flex',
        'items-center',
        'justify-center',
        'gap-[7px]',
        'h-[46px]',
        'rounded-lg',
        'bg-[#0D0E0F]'
      )}
      onClick={handleSave}
    >
      <Image
        src="/white-pen-icon.svg"
        width={14}
        height={14}
        alt="저장하기"
        priority={true}
      />
      <span className={tm('text-xs', 'text-white')}>이대로 저장할래요</span>
    </button>
  );
}

export default SaveButton;
