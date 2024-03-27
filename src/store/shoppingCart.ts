/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, CartItem, ShoppingCart } from '../types'

export const useShoppingCart = create<ShoppingCart>((set, get) => ({
  items: [],
  addItem: (product: Product, quantity: number = 1) => {
    set({ items: [{ product, quantity }] })
  },
  removeItem: (id: number) => {
    const { items } = get()
    set({ items: items.filter((item: CartItem) => item.product.id !== id) })
  },
  increaseQuantity: (id: number, quantity = 1) => {
    const { items } = get()
    const newItems = structuredClone(items)
    const itemIndex = newItems.findIndex((item: CartItem) => item.product.id === id)
    const itemData = newItems[itemIndex]
    newItems[itemIndex] = { ...itemData, quantity: itemData.quantity + quantity }
    set({ items: newItems })
  },
  decreaseQuantity: (id: number, quantity = 1) => {
    const { items } = get()
    const newItems = structuredClone(items)
    const itemIndex = newItems.findIndex((item: CartItem) => item.product.id === id)
    const itemData = newItems[itemIndex]
    const newQuantity = itemData.quantity !== 1 ? itemData.quantity - quantity : 1
    newItems[itemIndex] = { ...itemData, quantity: newQuantity }

    set({ items: newItems })
  },
  getTotalPrice: () => {
    const { items } = get()
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  },
  clearCart: () => set({ items: [] })

}))

// * Gracias al persist middleware, el estado de nuestro carrito de compras se almacenará en localStorage.

export const useShoppingCartPersist = create(
  persist<ShoppingCart>(
    (set, _get) => ({
      items: [],
      addItem: (_product: Product, _quantity: number = 1) => {

      },
      removeItem: (_productId: number) => {

      },
      increaseQuantity: (_productId: number, _quantity: number = 1) => {

      },
      decreaseQuantity: (_productId: number, _quantity: number = 1) => {

      },
      getTotalPrice: () => {
        return 0; // Replace 0 with your actual implementation
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart',
      // storage: createJSONStorage(() => sessionStorage) es cun campo opcional si NO queremos usar localStorage.
    }
  )
)