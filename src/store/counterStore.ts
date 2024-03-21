import { create } from 'zustand';

interface ICounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const useCounterStore = create<ICounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ((state.count < 10) ? { count: state.count + 1 } : state)),
  decrement: () => set((state) => ((state.count > 0) ? { count: state.count - 1 } : state)),
}));
