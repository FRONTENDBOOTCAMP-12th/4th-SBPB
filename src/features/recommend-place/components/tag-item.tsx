import { TagItemProps } from '../types/tag-item-props';

const tagIcons = ['📌', '🍚', '🏖️', '🍣', '🚝', '⛵️', '🚗', '🥐', '🌭'];

function TagItem({ tag }: TagItemProps) {
  const randomIcon =
    tagIcons.at(Math.floor(Math.random() * tagIcons.length)) ?? '🏖️';
  return (
    <li className="bg-content-primary text-white rounded-lg py-1.5 px-2.5 text-xs font-semibold flex gap-2">
      <span>{randomIcon}</span>
      <span>{tag}</span>
    </li>
  );
}

export default TagItem;
