import Link from 'next/link';

interface MyAreaProps {
  areas: { interested_area: string[] };
}

function MyArea({ areas }: MyAreaProps) {
  return (
    <article className="flex items-center px-1.5">
      <h2 className="text-gray-200 text-[10px] font-bold mr-2">
        나의 관심지역 :
      </h2>
      <ul className="flex gap-2 bg-gray-50 py-1">
        {areas.interested_area.map((area, idx) => (
          <li
            className="border border-gray-200 px-1 py-0.5 rounded-sm text-xs"
            key={idx}
          >
            {area}
          </li>
        ))}
      </ul>
      <Link
        className="text-xs text-gray-200 border rounded-xs p-0.5 ml-auto"
        href="/recommend-place/modify-area"
      >
        수정
      </Link>
    </article>
  );
}

export default MyArea;
