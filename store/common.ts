import { create } from 'zustand';

interface Pitch {
  id: string;
}

interface PitchStore {
  pitchId: Pitch | null;
  setCurrentPitch: (pitch: Pitch) => void;
}

export const usePitchStore = create<PitchStore>((set) => ({
  pitchId: null,
  setCurrentPitch: (pitch) => set({ pitchId: pitch }),
}));
