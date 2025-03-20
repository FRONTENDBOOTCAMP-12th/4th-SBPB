import { useMemo } from 'react';
import { TagItemProps } from '../types/tag-item-props';

const tagIcons = ['📌', '🍚', '🏖️', '🍣', '🚝', '⛵️', '🚗', '🥐', '🌭'];

function TagItem({ tag }: TagItemProps) {
  const icon = useMemo(() => {
    const sum = [...tag].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return tagIcons[sum % tagIcons.length];
  }, [tag]);
  return (
    <li className="bg-content-primary text-white rounded-lg py-1.5 px-2.5 text-xs font-semibold flex gap-2">
      <span>{icon}</span>
      <span>{tag}</span>
    </li>
  );
}

export default TagItem;
