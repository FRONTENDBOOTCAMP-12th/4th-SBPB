import { create } from 'zustand';
import { combine } from 'zustand/middleware';

interface State {
  userId: string;
  userEmail: string;
  userPassword: string;
  userPasswordConfirm: string;
  userSelectedArea: string[];
}

const INITIAL_STATE: State = {
  userId: '',
  userEmail: '',
  userPassword: '',
  userPasswordConfirm: '',
  userSelectedArea: [],
};

export const useAuthEmailStore = create(
  combine(INITIAL_STATE, (set) => ({
    saveAuth: (userInput: Omit<State, 'userSelectedArea'>) => {
      set((state) => ({
        ...state,
        ...userInput,
      }));
    },
    saveArea: (userInput: Pick<State, 'userSelectedArea'>) => {
      set(() => ({
        userSelectedArea: userInput.userSelectedArea,
      }));
    },
  }))
);
