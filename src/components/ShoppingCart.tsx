/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
import { useShoppingCart } from '../store/shoppingCart'
import { useShallow } from 'zustand/react/shallow'
import { Product } from '../types'
import '../App.css'


const ShoppingCart = () => {
  const shoppingStore = useShoppingCart()
  const items = shoppingStore.items
  const handlerAddProduct = (product: Product, quantity?: number) => shoppingStore.addItem(product, quantity ? quantity : 1)
  const handlerRemove = (id: number) => shoppingStore.removeItem(id)
  const handlerIncreaseQuantity = (id: number, quantity?: number) => shoppingStore.increaseQuantity(id, quantity ? quantity : 1)
  const handlerDecreaseQuantity = (id: number, quantity?: number) => shoppingStore.decreaseQuantity(id, quantity ? quantity : 1)
  const handlerclearCart = () => shoppingStore.clearCart()
  const handlerGetTotalPrice = () => shoppingStore.getTotalPrice()

  // * With useShallow
  // ? para evitar que los componentes vuelvan a renderizarse innecesariamente si las propiedades del estado no han cambiado.
  /*
  const { items2, addItem, removeItem, increaseQuantity, decreaseQuantity, getTotalPrice, clearCart } = useShoppingCart((state) => {
    return {
      items2: state.items,
      addItem: state.addItem,
      removeItem: state.removeItem,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
      getTotalPrice: state.getTotalPrice,
      clearCart: state.clearCart,
    }
  })
  */
  // ? Por defecto si no usamos shallow, Zustand detecta los cambios con igualdad estricta (old === new), lo cual es eficiente para estados atómicos.
  // ? Debido a que la igualdad estricta por defecto no sería útil en este caso para evaluar objetos, ya que provocaría un re-renderizado incluso si el objeto no ha cambiado.
  // ? Toda esto aplica en el caso de que deseemos usar objetos para recuperar los estados de nuestro store.
  return (
    <>
      <h1>ShoppingCart Zustand</h1>
      <ul className='flat'>
        <li>
          <button onClick={() => handlerAddProduct({ id: 1, name: 'Product 1', price: 100 }, 3)}>add Product 1</button>
        </li>
        <li>
          <button onClick={() => handlerAddProduct({ id: 2, name: 'Product 2', price: 200 })}>add Product 2</button>
        </li>
        <li>
          <button onClick={() => handlerAddProduct({ id: 2, name: 'Product 3', price: 200 })}>add Product 3</button>
        </li>
        <li>
          <button onClick={() => handlerAddProduct({ id: 2, name: 'Product 4', price: 200 })}>add Product 4</button>
        </li>
        <li>
          <button onClick={() => handlerAddProduct({ id: 2, name: 'Product 5', price: 200 }, 6)}>add Product 5</button>
        </li>
      </ul>
      <main>
        <h2>Cart</h2>
        <ul>
          {
            shoppingStore.items
              ?
              shoppingStore.items.map((item, _index) => (
                <ul key={item.product.id}>
                  <li >
                    Name: {item.product.name}
                  </li>
                  <li>
                    Price: ${item.product.price}
                  </li>
                  <li>
                    Quantity: {item.quantity}
                  </li>
                </ul>
              ))
              : null
          }
        </ul>

        <section>
          <h2>List Shopping Cart</h2>
          {items.length === 0 && <p>Cart is empty</p>}
          {items.length > 0 && (
            <div>
              <p>Total items: {items.length}</p>
              <h3>Total price: {handlerGetTotalPrice()}</h3>
              <button onClick={handlerclearCart}></button>
            </div>
          )}
        </section>
        <ul>
          {
            items.map((item, _index) => (
              <li key={item.product.id}>
                <p>Name: {item.product.name}</p>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handlerIncreaseQuantity(item.product.id)}>+</button>
                <button onClick={() => handlerDecreaseQuantity(item.product.id)} disabled={item.quantity === 1}>-</button>
                <button onClick={() => handlerRemove(item.product.id)}>Remove</button>
              </li>
            ))
          }
        </ul>
      </main>
    </>
  )
}

export default ShoppingCart