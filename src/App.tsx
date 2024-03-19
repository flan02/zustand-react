

import React from 'react'

import './App.css'
import ProductList from './components/ProductList'
import { PRODUCTS } from './products'
import Cart from './components/Cart'

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

export default App
