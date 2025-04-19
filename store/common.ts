import { create } from 'zustand';

interface Pitch {
  id: string;
}

interface CommonStore {
  pitchId: Pitch | null;
  setCurrentPitch: (pitch: Pitch) => void;
}

export const useCommonStore = create<CommonStore>((set) => ({
  pitchId: null,
  setCurrentPitch: (pitch) => set({ pitchId: pitch }),
}));
