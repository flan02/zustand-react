/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */


import { Product } from "../products"
import { useCartStore } from "../store/cart-store"

/*
* The common way without global state management
interface CartProps {
  products: Product[]
  setCart: (item: (products: Product[]) => Product[]) => void

}

const ProductList = (props: CartProps) => {
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {props.products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button onClick={() => props.setCart((cart: Product[]) => [...cart, product])}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

*/

interface ProductProps {
  products: Product[]
}

// TODO The Zustand way

const ProductList = (props: ProductProps) => {

  // TODO two ways to use the store. When you have a lot of state to manage, it is better to use the second way
  const addToCart = useCartStore((state) => state.addToCart)
  const cartStore = useCartStore((state) => ({
    addToCart: state.addToCart
  }))
  cartStore.addToCart

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {
          props.products.map((product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => addToCart && addToCart(product)}>Add to Cart</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
export default ProductList