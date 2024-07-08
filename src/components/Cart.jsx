import { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import Button from './UI/Button'
import { currencyFormatter } from '../utils/formatter'
import userProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem'

export default function Cart() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(userProgressContext)
  const totalAmount = cartCtx.items.reduce((amount, item) => {
    return (amount = amount + item.quantity * item.price)
  }, 0)
  function handleClose() {
    userProgressCtx.hideCart()
  }
  function handleShowCheckOut() {
    userProgressCtx.showCheckOut()
  }
  return (
    <Modal
      classname="cart"
      open={userProgressCtx.progress === 'cart'}
      onClose={userProgressCtx.progress === 'cart' ? handleClose : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          )
        })}
      </ul>
      <p className="cart-total">
        {`Total Amount ${currencyFormatter.format(totalAmount)}`}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleClose}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleShowCheckOut}> Go to Checkout</Button>
        )}
      </p>
    </Modal>
  )
}
