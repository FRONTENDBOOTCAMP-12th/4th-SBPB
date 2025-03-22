import { motion } from 'framer-motion';
import SignButton from './sign-button';
import { SetStateAction, useId, useState } from 'react';
import Animate from '@/components/animate';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/client';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

interface ProfileModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

function ProfileModal({ isOpen, setIsOpen }: ProfileModalProps) {
  const router = useRouter();
  const { saveAuth } = useAuthStore();
  const supabase = createClient();
  const [localImagePath, setLocalImagePath] = useState<string>('');
  const [publicImagePath, setPublicImagePath] = useState<string>('');

  const id = useId();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLocalImagePath(URL.createObjectURL(file));

    const filePath = `profiles/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      return;
    }

    const { data: publicImgUrl } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);

    setPublicImagePath(publicImgUrl.publicUrl);
  };

  const handlePickImage = () => {
    saveAuth({ userProfile: publicImagePath });
    setIsOpen(false);
    router.push('/signup');
  };

  return (
    <Animate>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-primary/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.dialog
            open
            className="fixed w-[300px] h-[500px] rounded-2xl top-1/2 left-1/2 -translate-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
          >
            <h3 className="text-xl font-medium text-center my-5">
              프로필 선택
            </h3>
            <div className="flex flex-col gap-8">
              <div className="flex justify-center">
                <label
                  className="border rounded-full px-2 py-1 text-sm"
                  htmlFor={id}
                >
                  이미지 선택
                </label>
                <input
                  className="hidden"
                  type="file"
                  id={id}
                  onChange={handleImageChange}
                />
              </div>
              {localImagePath ? (
                <Image
                  className="rounded-full mx-auto"
                  src={localImagePath}
                  alt="프로필 미리보기"
                  width={240}
                  height={240}
                />
              ) : (
                <Image
                  className="rounded-full mx-auto bg-gray-100"
                  src="default-profile.svg"
                  alt="기본 이미지"
                  width={240}
                  height={240}
                />
              )}

              <div className="flex mx-2 gap-1">
                <SignButton label="닫기" onClick={handleClose} />
                <SignButton label="선택완료" onClick={handlePickImage} />
              </div>
            </div>
          </motion.dialog>
        </>
      )}
    </Animate>
  );
}

export default ProfileModal;
