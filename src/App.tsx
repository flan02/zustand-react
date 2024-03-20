

//import React from 'react'

import './App.css'
import ProductList from './components/ProductList'
import { PRODUCTS } from './products'
import Cart from './components/Cart'

/* 
* The common way without global state management
function App() {
  const [cart, setCart] = React.useState<typeof PRODUCTS>([])
  return (
    <div className='App'>
    <h1>Welcome to the Store with Zustand</h1>
    <ProductList products={PRODUCTS} setCart={setCart} />
    <hr />
    <Cart cart={cart} setCart={setCart} />
    </div>
    )
  }
*/

// TODO The Zustand way
// ? it looks like the component is cleaner

function App() {

  return (
    <div className='App'>
      <h1>Welcome to the Store with Zustand</h1>
      <ProductList products={PRODUCTS} />
      <hr />
      <Cart />
    </div>
  )
}

export default App
