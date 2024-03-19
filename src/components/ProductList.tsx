/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */


import { Product } from "../products"

interface CartProps {
  products: Product[]
  //setCart: Dispatch<SetStateAction<Product[]>>
  //setCart: Dispatch<SetStateAction<Product[]>>
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

export default ProductList