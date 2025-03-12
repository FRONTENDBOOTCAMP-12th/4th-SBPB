'use client';
import { tm } from '@/utils/tw-merge';

function CommentModal() {
  return (
    <>
      <div className={tm('bg-[#313131]/70', 'h-screen')}>
        <div
          className={tm(
            'fixed',
            'bottom-[0px]',
            'left-[0px]',
            'right-[0px]',
            'bg-white',
            'min-h-[75px]',
            'rounded-t-3xl'
          )}
        >
          <ul>
            <li className={tm('px-[10px]', 'min-h-[74px]')}>
              <figure className={tm('flex', 'gap-[10px]')}>
                <picture>
                  <img src="./thum-img.svg" />
                </picture>
                <figcaption>
                  <span>망나뇽</span>
                  <p className={tm('text-xs')}>
                    저런 음료가 있었나요? 제가 갔을 땐 없던데...
                  </p>
                  <button className={tm('text-xs', 'text-[#6B6B6B]')}>
                    답글 1개
                  </button>
                </figcaption>
              </figure>
            </li>
            <li className={tm('px-[10px]')}>
              <figure className={tm('flex', 'gap-[10px]')}>
                <picture>
                  <img src="./thum-img.svg" />
                </picture>
                <figcaption>
                  <span>샤미드</span>
                  <p className={tm('text-xs')}>
                    저런 음료가 있었나요? 제가 갔을 땐 없던데...
                  </p>
                  <button className={tm('text-xs', 'text-[#6B6B6B]')}>
                    답글 달기
                  </button>
                </figcaption>
              </figure>
            </li>
            <li className={tm('px-[10px]')}>
              <figure className={tm('flex', 'gap-[10px]')}>
                <picture>
                  <img src="./thum-img.svg" />
                </picture>
                <figcaption>
                  <span>고라파덕</span>
                  <p className={tm('text-xs')}>
                    저런 음료가 있었나요? 제가 갔을 땐 없던데...
                  </p>
                  <button className={tm('text-xs', 'text-[#6B6B6B]')}>
                    답글 달기
                  </button>
                </figcaption>
              </figure>
            </li>
            <li className={tm('px-[10px]')}>
              <figure className={tm('flex', 'gap-[10px]')}>
                <picture>
                  <img src="./thum-img.svg" />
                </picture>
                <figcaption>
                  <span>박윤경</span>
                  <p className={tm('text-xs')}>
                    저런 음료가 있었나요? 제가 갔을 땐 없던데...
                  </p>
                  <button className={tm('text-xs', 'text-[#6B6B6B]')}>
                    답글 달기
                  </button>
                </figcaption>
              </figure>
            </li>
          </ul>
          <div
            className={tm(
              'flex',
              'justify-center',
              'items-center',
              'flex-col',
              'h-[75px]'
            )}
          >
            <p>아직 댓글이 없습니다!👀</p>
            <p className={tm('text-xs', 'text-gray-700')}>
              댓글을 남겨보세요.✍️
            </p>
          </div>
          <div
            className={tm(
              'border-solid',
              'border-[#D9D9D9]',
              'border-t-1',
              'px-[16px]',
              'py-[17px]',
              'items-center'
            )}
          >
            <form className={tm('flex', 'gap-[10px]')}>
              <img src="./thum-img-02.svg" />
              <div
                className={tm(
                  'inline-flex',
                  'items-center',
                  'bg-[#ECECEC]',
                  'rounded-[5px]',
                  'text-xs',
                  'h-[30px]',
                  'grow-1',
                  'px-[7px]'
                )}
              >
                <input
                  type="text"
                  placeholder="댓글 달기..."
                  className={tm('grow-[26]')}
                />
                <button
                  type="submit"
                  className={tm(
                    'bg-[#0D0E0F]',
                    'h-[20px]',
                    'rounded-[50px]',
                    'grow-1',
                    'text-center',
                    'cursor-pointer'
                  )}
                >
                  <img
                    src="./comment-button.svg"
                    className={tm('inline-block')}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentModal;
