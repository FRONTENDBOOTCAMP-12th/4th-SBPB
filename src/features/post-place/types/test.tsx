import { tm } from '@/util/tw-merge';

function Test(){
    return (
        <form className={tm('mb-10')}>
        <label >
          카드 검색
        </label>
        <div >
          <input/>
          <button
            type="submit">
          </button>
        </div>
      </form>
    )
}

export default Test