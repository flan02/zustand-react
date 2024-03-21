/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useCounterStore } from "../store/counterStore"

type Props = {}

const ZustandBasics = (props: Props) => {
  const counterStore = useCounterStore()
  console.log(counterStore);
  return (
    <>
      <h1>
        ZustandBasics
      </h1>
      <h2>
        {counterStore.count}
      </h2>
      <button onClick={counterStore.increment}>
        +
      </button>
      <button onClick={counterStore.decrement}>
        -
      </button>
    </>
  )
}

export default ZustandBasics