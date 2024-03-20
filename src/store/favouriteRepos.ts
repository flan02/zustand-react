/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { favouriteReposState } from '../types'
import { persist } from "zustand/middleware"

// We handle the state of the data in the client side using Zustand


// TODO Common way to create a store
// ? SET params allow us to change the state of the store
export const useFavouriteReposStore = create<favouriteReposState>(
  (set) => ({
    id: [],
    addFavourite: (id: number) =>
      set((state) => ({
        id: [...state.id, id]
      })),
    removeFavourite: (id: number) => set((state) => ({
      id: state.id.filter((item) => item !== id)
    })),
  }),
)

// * Persist the state of the store in the local storage if the user refresh the page

export const useFavouriteReposStorePersist = create(persist<favouriteReposState>(
  (set) => ({
    id: [],
    addFavourite: (id: number) =>
      set((state) => ({
        id: [...state.id, id]
      })),
    removeFavourite: (id: number) => set((state) => ({
      id: state.id.filter((item) => item !== id)
    })),
  }),
  {
    name: "favourite-repos", // name of the local storage variable
  }
))

