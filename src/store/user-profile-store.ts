import { create } from 'zustand';
import { createClient } from '@/utils/supabase/client';
import { UserProfileState } from '@/types/user-profile-type';

const supabase = createClient();

export const useUserProfileStore = create<UserProfileState>((set) => ({
  user: null,
  userInfo: null,
  stats: { posts: 0, photos: 0, following: 0, followers: 0 },

  fetchUser: async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const { data: user, error: userError } = await supabase.auth.getUser();

    if (!sessionData.session) {
      // 비로그인 → 세션이 없으면 이후 유저 정보 요청 생략
      // console.log('로그인되어 있지 않습니다.');
      return;
    }

    // 세션 있음 → getUser 호출
    if (userError) {
      console.error('유저 정보 가져오기 실패:', userError.message);
      return;
    }

    const userEmail = user.user.email ?? '';

    const { data: userInfo, error: userInfoError } = await supabase
      .from('userinfo')
      .select('*')
      .eq('email', userEmail)
      .single();

    if (userInfoError || !userInfo) {
      console.error('userinfo 데이터 없음:', userInfoError?.message);
      return;
    }

    set({ user: { id: user.user.id, email: userEmail }, userInfo });
    await useUserProfileStore.getState().fetchUserStats(userInfo.id);
  },

  fetchUserStats: async (userId: number) => {
    if (!userId) {
      console.error('유효하지 않은 userId:', userId);
      return;
    }

    const postCount = await supabase
      .from('post')
      .select('*', { count: 'exact' })
      .eq('user_id', Number(userId));

    const photoCount = await supabase
      .from('post')
      .select('*', { count: 'exact' })
      .eq('user_id', Number(userId));

    const followersCount = await supabase
      .from('follow')
      .select('*', { count: 'exact' })
      .eq('follow_user_id', Number(userId));

    const followingCount = await supabase
      .from('follow')
      .select('*', { count: 'exact' })
      .eq('following_user_id', Number(userId));

    set({
      stats: {
        posts: postCount.count ?? 0,
        photos: photoCount.count ?? 0,
        following: followingCount.count ?? 0,
        followers: followersCount.count ?? 0,
      },
    });
  },

  updateProfileImage: async (file: File) => {
    const { user } = useUserProfileStore.getState();
    if (!user) return;

    const filePath = `profiles/${user.id}/${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from('profile-images')
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      console.error('이미지 업로드 실패:', uploadError.message);
      return;
    }

    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(filePath);
    const newProfileUrl = data.publicUrl;

    const { error: updateError } = await supabase
      .from('userinfo')
      .update({ profile_path: newProfileUrl })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('프로필 이미지 업데이트 실패:', updateError.message);
      return;
    }

    await useUserProfileStore.getState().fetchUserStats(Number(user.id));
  },

  logout: async () => {
    await supabase.auth.signOut();

    localStorage.removeItem('isAuth');

    set({
      user: null,
      userInfo: null,
      stats: { posts: 0, photos: 0, following: 0, followers: 0 },
    });
  },
}));
