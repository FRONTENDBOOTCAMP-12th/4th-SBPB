import { create } from 'zustand';

interface Place {
  road_address_name: string;
  place_name: string;
}

interface PlacesStore {
  places: Place[];

  addPlace: (place: Place) => void;
  setPlaces: (places: Place[]) => void;
  removePlace: (placeName: string) => void;
  deletePlace: (index: number) => void;
  deleteAllPlaces: () => void;
}

export const usePlacesStore = create<PlacesStore>((set) => ({
  places: [],
  setPlaces: (places) => set({ places }),
  addPlace: (place) =>
    set((state) => ({
      places: [...state.places, place],
    })),
  deletePlace: (index) =>
    set((state) => ({
      places: state.places.filter((_, i) => i !== index),
    })),
  removePlace: (placeName) =>
    set((state) => ({
      places: state.places.filter((place) => place.place_name !== placeName),
    })),
  deleteAllPlaces: () => set({ places: [] }),
}));
