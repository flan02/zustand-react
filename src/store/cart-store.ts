/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { Product } from "../products"

type CartState = {
  cart: Product[]
  addToCart?: (product: Product) => void
  removeFromCart: (productId: number) => void
  emptyCart: () => void
}

export const useCartStore = create<CartState>((set) => {
  return {
    cart: [], // initial state
    addToCart: (product: Product) => set((state: { cart: Product[] }) => ({ cart: [...state.cart, product] })),
    removeFromCart: (productId: number) => set((state: { cart: Product[] }) => ({ cart: state.cart.filter(item => item.id !== productId) })),
    emptyCart: () => set({ cart: [] })
  }

})

type Address = {
  street: string
  city: string
  zipCode: string
}

type Profile = {
  name: string
  email: string
  address: Address // nested object 2
}

interface User {
  id: string
  friends: string[]
  profile: Profile // nested object 1
}


type UserStore = {
  user: User
  updateAddressStreet: (street: string) => void
}

const initialState = {
  user: {
    id: "1",
    friends: ["jack", "jill", "jessica", "jason"],
    profile: {
      name: "john doe",
      email: "john.doe@example.com",
      address: {
        street: "123 Main St",
        city: "Phoenix",
        zipCode: "85001"
      }
    }
  }
}

export const useStore = create<UserStore>((set) => ({
  ...initialState,
  updateAddressStreet: (street: string) =>
    set((state) => ({
      user: {
        ...state.user,
        profile: {
          ...state.user.profile,
          address: {
            ...state.user.profile.address,
            street
          }
        }
      }
    }))
}))