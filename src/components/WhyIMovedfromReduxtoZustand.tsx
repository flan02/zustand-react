/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { create } from 'zustand'

type Props = {}
interface Bears {
  bears: number
  increasePopulation: () => void
  removeAllBears: () => void
}

const useStore = create<Bears>((set) => ({
  bears: 0,
  increasePopulation: () => set((state: Bears) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))



//* Component
const BearCounter = () => {
  const bears = useStore((state) => state.bears)
  return <h1>{bears} around here ...</h1>
}

//* Component
const Controls = () => {
  const increasePopulation = useStore()
  return <button onClick={increasePopulation.increasePopulation}>one up</button>
}

// ? Component
// $ WhyIMovedfromReduxtoZustand

const WhyIMovedfromReduxtoZustand = (_props: Props) => {
  return (
    <>
      <h1>Why I Moved from Redux to Zustand</h1>
      <BearCounter />
      <Controls />
    </>
  )
}

export default WhyIMovedfromReduxtoZustand