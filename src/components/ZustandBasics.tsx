/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from "react"
import { useCounterStore } from "../store/counterStore"
import { useShallow } from "zustand/react/shallow"

type Props = {}

const ZustandBasics = (_props: Props) => {
  // * Usando el hook useCounterStore de Zustand
  // * Por defecto si no usamos shallow, Zustand detecta los cambios con igualdad estricta (old === new), lo cual es eficiente para estados atómicos (es decir compara una sola propiedad).
  //const counterStore = useCounterStore()
  //console.log(counterStore);
  /* 
  Debido a que la igualdad estricta por defecto no sería útil en este caso para evaluar objetos, ya que provocaría un re-renderizado incluso si el objeto no ha cambiado. 
  Por eso, utilizamos el hook useShallow para evitar este comportamiento y optimizar el rendimiento del componente.
  */

  // TODO usando Shallow
  // ? Estamos utilizando el hook useShallow para evitar que los componentes vuelvan a renderizarse innecesariamente si las propiedades del estado no han cambiado
  const { count, title, posts, increment, decrement } = useCounterStore(
    useShallow((state) => ({
      count: state.count,
      title: state.title,
      posts: state.posts,
      increment: state.increment,
      decrement: state.decrement,
    }))
  )
  // ! Todo esto aplica en el caso de que deseemos usar objetos para recuperar los estados de nuestro store.
  // ! Si creamos un objeto estamos pasando un solo dato con muchas propiedades. cuando comparamos objeto_OLD === objeto_NEW, siempre será falso, ya que son dos objetos diferentes, aunque tengan las mismas propiedades.  {} === {} // false
  //console.log(count, increment, decrement);

  // * Es buena practica separar en distintas variables las props que contienen valores a las props que son funciones 
  //const incrementRandom = useCounterStore((state) => state.incrementRandom) // ? esta es una de importarlo
  const { incrementRandom, getPosts, clearStore, multiplyRandom } = useCounterStore() // ? esta es otra forma de importarlo

  React.useEffect(() => {
    getPosts()
  }, []) // * Solo se ejecutará una vez

  return (
    <>
      <h1>
        {title}
      </h1>
      {
        /*  
        ? Zustand Common Way
        <h2>
          {counterStore.count}
        </h2>
        <button onClick={counterStore.increment}>
          +
        </button>
        <button onClick={counterStore.decrement}>
          -
        </button>
        */
      }
      <h2>
        {count}
      </h2>
      <button onClick={increment}>
        +
      </button>
      <button onClick={decrement}>
        -
      </button>
      <button onClick={() => incrementRandom(Math.round(Math.random() * 10))}>
        Increment X
      </button>
      <button
        onClick={() => multiplyRandom(Math.round(Math.random() * 10))}
        type="button">Multiply X</button>
      <button
        onClick={() => clearStore()}
        type="button">clear</button>
      <hr />
      {
        JSON.stringify(posts, null, 2)
      }
    </>
  )
}

export default ZustandBasics