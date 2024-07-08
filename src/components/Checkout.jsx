import { useContext } from 'react'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatter'
import Input from './UI/Input'
import Button from './UI/Button'
import Modal from './UI/Modal'
import userProgressContext from '../store/UserProgressContext'
import useHttp from '../hooks/useHttp'
import Error from './Error'

const configObj = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
}

export default function Checkout() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(userProgressContext)

  const {
    data,
    isLoading: isSending,
    isError,
    sendRequest,
    clearData,
  } = useHttp('http://localhost:3000/orders', configObj, [])

  const totalAmount = cartCtx.items.reduce((totalAmount, item) => {
    return totalAmount + item.price * item.quantity
  }, 0)
  function handleClick() {
    userProgressCtx.hideCheckout()
  }

  function handleFinish() {
    userProgressCtx.hideCheckout()
    cartCtx.clearCart()
    clearData()
  }
  function handleSubmit(event) {
    event.preventDefault()
    const fd = new FormData(event.target)
    const customerData = Object.fromEntries(fd.entries())

    sendRequest(
      JSON.stringify({
        order: { items: cartCtx.items, customer: customerData },
      }),
    )
    // fetch('http://localhost:3000/orders', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // body: JSON.stringify({
    //   order: { items: cartCtx.items, customer: customerData },
    // }),
    // })
    // }
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClick}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  )
  if (isSending) {
    actions = <span>Sending order data...</span>
  }
  if (data.message && !isError) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
      >
        <h2>Succes!</h2>
        <p>Your order was submitted succesfully.</p>
        <p>
          We will get back to you with more details via email within few minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    )
  }
  return (
    <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClick}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>{`Total Price :  ${currencyFormatter.format(totalAmount)}`} </p>
        <Input label="Full-name" type="text" id="name" />
        <Input label="E-mail" type="mail" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal-Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {isError && <Error title="Data did not submitted" message={isError} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  )
}
