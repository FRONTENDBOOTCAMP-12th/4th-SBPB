function TagFilter({ tags }: { tags: string[] }) {
  return (
    <ul className="flex items-center gap-2 justify-center py-2">
      {tags.map((tag) => (
        <li key={tag}>
          <button
            type="button"
            className="py-1.5 px-2 border border-content-tertiary rounded-2xl text-content-tertiary text-xs focus:bg-content-secondary focus:text-white"
          >
            {tag}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TagFilter;
