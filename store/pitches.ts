import axios from '@/lib/axios';
import { create } from 'zustand';
export interface PitchDetails {
  askAmount: string;
  businessModel: string;
  competition: string;
  equity: string;
  marketSize: string;
  problem: string;
  solution: string;
  team: string;
  traction: string;
  useOfFunds: string;
}

export interface Pitch {
  id: string;
  createdAt: number;
  description: string;
  founderName: string;
  founderPhotoUrl: string;
  founderTitle: string;
  name: string;
  pitchDetails: PitchDetails;
  sector: string;
  tagline: string;
  thumbnailUrl: string;
  userId: string;
  videoUrl: string;
}

interface PitchArrayState {
  pitchArray: Pitch[];
  isLoading: boolean;
  error: string | null;
  fetchPitches: () => Promise<void>;
}
export const usePitchArrayStore = create<PitchArrayState>((set) => ({
  pitchArray: [],
  isLoading: false,
  error: null,

  fetchPitches: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get<Pitch[]>('/pitch');
      set({ pitchArray: res.data, isLoading: false });
    } catch (err: any) {
      set({
        error: err.message || 'Failed to fetch pitches',
        isLoading: false,
      });
    }
  },
}));
