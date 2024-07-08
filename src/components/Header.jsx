import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import '../index.css'
import CartContext from '../store/CartContext'
import userProgressContext from '../store/UserProgressContext'

export default function Header() {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(userProgressContext)
  const count = cartCtx.items.reduce((count, item) => {
    return item.quantity + count
  }, 0)

  function handleClick() {
    userProgressCtx.showCart()
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={logoImg} alt="A restaurant"></img>
          <h1 id="title">My Blog</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleClick}>
            Cart ({count})
          </Button>
        </nav>
      </header>
    </>
  )
}
