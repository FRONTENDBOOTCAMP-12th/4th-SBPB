import { create } from 'zustand';

type SortOption = 'latest' | 'popular';

interface SortState {
  sortType: SortOption;
  setSortType: (type: SortOption) => void;
}

export const useSortStore = create<SortState>((set) => ({
  sortType: 'latest',
  setSortType: (sortType) => set({ sortType }),
}));
