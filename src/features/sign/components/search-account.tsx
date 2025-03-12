import Link from 'next/link';

function SearchAccount() {
  return (
    <div className="flex flex-col gap-2 my-20">
      <Link
        className="flex justify-center gap-2 w-[15.625rem] py-3 rounded-sm bg-content-primary text-white border border-white text-xs mx-auto"
        href="/signup"
      >
        회원가입
      </Link>
      <Link
        className="flex justify-center gap-2 w-[15.625rem] py-3 rounded-sm bg-content-primary text-white border border-white text-xs mx-auto"
        href="/feed"
      >
        비회원으로 시작하기
      </Link>
    </div>
  );
}

export default SearchAccount;
