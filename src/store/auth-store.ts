import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface State {
  type: 'email' | 'kakao' | 'google' | '';
  userId: string;
  userNickname: string;
  userEmail: string;
  userPassword?: string;
  userPasswordConfirm?: string;
  userSelectedArea: string[];
  userProfile: string;
}

const INITIAL_STATE: State = {
  type: '',
  userId: '',
  userNickname: '',
  userEmail: '',
  userPassword: '',
  userPasswordConfirm: '',
  userSelectedArea: [],
  userProfile: '',
};

export const useAuthStore = create(
  combine(INITIAL_STATE, (set) => ({
    saveAuth: (userInput: Partial<State>) => {
      set((state) => ({
        ...state,
        ...userInput,
      }));
    },
  }))
);
