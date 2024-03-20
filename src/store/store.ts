import { create } from 'zustand'
import { createVariables } from './create-variables'

// TODO La interfaz siempre es extensible
// ? Los tipos no pueden ser extendidas una vez declaradas

export interface Incremental {
  count: number
  increment: () => void
  decrement: () => void
}

// ? Aqui hay que exportar las variables para poder usarlas en otros componentes
export const C = (state: { count: number }) => state.count
export const INC = (state: { increment: () => void }) => state.increment
export const DEC = (state: { decrement: () => void }) => state.decrement

export const useStore = create<Incremental>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => state.count > 0 ? { count: state.count - 1 } : {}),
}))

export const useStoreVariables = createVariables(useStore) // ? Se puede extender el store con más variables, es un manejador de estado global para las variables
