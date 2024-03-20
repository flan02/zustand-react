/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */

//import { Product } from "../products"
import { useCartStore } from "../store/cart-store"



/*
* The common way without global state management

interface CartProps {
  cart: Product[]
  setCart: (item: Product[]) => void
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
    <button onClick={() => props.setCart(props.cart.filter(item => item.id !== product.id))}>Remove</button>
    </li>
    ))}
    </ul>
    {
      props.cart.length > 0 && <button onClick={() => props.setCart([])}>Empty Cart</button>
    }
    </div>
    )
  }    
*/

// TODO The Zustand way
// ? it does not receive props anymore

const Cart = () => {
  const cartStore = useCartStore((state) => ({
    cart: state.cart,
    removeFromCart: state.removeFromCart,
    emptyCart: state.emptyCart

  }))

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartStore.cart.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => cartStore.removeFromCart(product.id)}>Remove</button>
          </li>
        ))}
      </ul>
      {
        cartStore.cart.length > 0 && <button onClick={() => cartStore.emptyCart()}>Empty Cart</button>
      }
      <hr />
    </div>
  )
}

export default Cart