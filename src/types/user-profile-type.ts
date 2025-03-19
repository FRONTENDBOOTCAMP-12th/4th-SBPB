interface User {
  id: string;
  email: string;
}

interface UserInfo {
  id: number;
  user_id: string;
  nickname: string;
  email: string;
  profile_path: string | null;
}

interface UserStats {
  posts: number;
  photos: number;
  following: number;
  followers: number;
}

export interface UserProfileState {
  user: User | null;
  userInfo: UserInfo | null;
  stats: UserStats;
  fetchUser: () => Promise<void>;
  fetchUserStats: (userId: number) => Promise<void>;
  updateProfileImage: (file: File) => Promise<void>;
  logout: () => Promise<void>;
}
