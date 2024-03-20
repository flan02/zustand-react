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
    addToCart: (product: Product) => set((state: { cart: Product[] }) => ({ cart: [...state.cart, product] })), // immutable object
    removeFromCart: (productId: number) => set((state: { cart: Product[] }) => ({ cart: state.cart.filter(item => item.id !== productId) })),
    emptyCart: () => set({ cart: [] })
  }

})
