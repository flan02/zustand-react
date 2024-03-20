/* eslint-disable @typescript-eslint/no-unused-vars */
import { useStore, useStoreVariables } from '../store/store'
import { C, INC, DEC } from '../store/store'

/*
  * The classic way

const Counter = () => {
  
  const selector = useStore((state) => ({
    count: state.count,
    increment: state.increment,
    decrement: state.decrement
  }))
  
  // TODO The Zustand way
  const counter = useStore(count)
  const incremental = useStore(increment)
  const decremental = useStore(decrement)
  return (
    <>
      <h2>Counter</h2>
      <p>{selector.count}</p>
      <button onClick={selector.increment}>Increment</button>
      <button onClick={selector.decrement}>Decrement</button>
    </>
  )
}
*/

// TODO The Zustand way
const Counter = () => {
  /*
  * We call the store directly
  const counter = useStore(C)
  const incremental = useStore(INC)
  const decremental = useStore(DEC)
  */
  // TODO Better way to call the store using a generic function
  const counter = useStoreVariables.use.count()
  const incremental = useStoreVariables.use.increment()
  const decremental = useStoreVariables.use.decrement()
  // TODO Or we can save all the variables in a single object and call them when we need
  const storedVariables = useStoreVariables.use

  return (
    <>
      <h2>Counter</h2>
      <p>{counter}</p>
      <button onClick={incremental}>Increment</button>
      <button onClick={decremental}>Decrement</button>
    </>
  )
}

export default Counter