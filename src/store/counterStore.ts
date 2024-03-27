/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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


// * Example from Zustand

interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  amount: number

}

interface Products {
  products: Product[]
  loading: boolean
  cart: Product[]
  singleProduct: object
  fetchProducts: () => Promise<void>
  addToCart: (id: number) => void
  removeFromCart: (id: number) => void
}

//$ Manage state with Zustand with a complex e-commerce object and several functions.

export const useProductsStore = create(
  persist<Products>(
    (set, get) => ({
      products: [],
      loading: false,
      cart: [],
      singleProduct: {},
      fetchProducts: async () => {
        const res = await axios.get('https://fakestoreapi.com/products');
        set({ loading: false, products: res.data });
      },
      addToCart: (id: number) => {
        const state = get()
        const item = state.products.find((product) => product.id === id)
        const inCart = state.cart.find((item) => item.id === id ? true : false)
        console.log("here", item);
        if (item) {
          set({
            cart: inCart
              ? state.cart.map((item) => item.id === id
                ? { ...item, amount: item.amount + 1 }
                : item)
              : [...state.cart, { ...item, amount: 1 }]
          })
        }
      },
      removeFromCart: (id: number) => {
        const state = get()
        const item = state.cart.find((item) => item.id === id)
        console.log(item);
      },
      fetchSingleProduct: async (id: number) => {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
        set({
          loading: false,
          singleProduct: res.data
        });
      }
    }), {
    name: 'products-storage',
    getStorage: () => sessionStorage
  })
)


