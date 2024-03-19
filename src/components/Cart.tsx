/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

import { Product } from "../products"

interface CartProps {
  cart: Product[]
  setCart: (item: []) => void

}



const Cart = (props: CartProps) => {
  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {props.cart.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => props.setCart([])}>Remove</button>
          </li>
        ))}
      </ul>
      {
        props.cart.length > 0 && <button onClick={() => props.setCart([])}>Empty Cart</button>
      }
    </div>
  )
}

export default Cart