import { create } from 'zustand';

interface IPost {
  id: number
  title: string
  body: string
}
interface ICounterState {
  count: number;
  title: string
  posts: IPost[]
  increment: () => void;
  decrement: () => void;
  incrementRandom: (value: number) => void;
  getPosts: () => Promise<void>
  clearStore: () => void
  multiplyRandom: (value: number) => void
}

export const useCounterStore = create<ICounterState>((set, get) => ({
  count: 5,
  title: 'Zustand advanced',
  posts: [],
  increment: () => set((state) => ((state.count < 10) ? { count: state.count + 1 } : state)),
  decrement: () => set((state) => ((state.count > 0) ? { count: state.count - 1 } : state)),
  incrementRandom: (value: number) => set((state) => ({ count: state.count + value })),
  getPosts: async () => {
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json());
    //console.log(posts);
    set((state) => ({
      ...state, // Mantenemos el estado actual
      posts // Actualizamos el estado con los nuevos posts
    }));
  },
  clearStore: () => set({}, true), // * Clear all store
  multiplyRandom: (value: number) => {
    //get().count > 0 && set((state) => ({ count: state.count - value }));  // * Destructuring all properties
    const { count } = get() // * Destructuring only the property we want
    set({ count: count * value })
  }
}));


