function ThemeBar() {
  return (
    <article className="flex justify-center gap-1">
      <button
        className="font-semibold border-b-3 border-transparent text-xs py-1 my-2 w-22 focus:border-b-3 focus:border-accent focus:text-accent"
        type="button"
      >
        전국 여행지
      </button>
      <button
        className="font-semibold border-b-3 border-transparent text-xs py-1 my-2 w-22 focus:border-b-3 focus:border-accent focus:text-accent"
        type="button"
      >
        관심 지역
      </button>
    </article>
  );
}

export default ThemeBar;
