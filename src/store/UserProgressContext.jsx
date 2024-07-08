import { createContext, useState, children } from 'react'

const userProgressContext = createContext({
  progress: '',
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckout: () => {},
})

export function UserProgressProvider({ children }) {
  const [userProgress, setUserProgress] = useState('')
  function showCart() {
    setUserProgress('cart')
  }
  function hideCart() {
    setUserProgress('')
  }
  function showCheckOut() {
    setUserProgress('checkout')
  }
  function hideCheckout() {
    setUserProgress('')
  }

  const UserProgressProviderValue = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckout,
  }

  return (
    <userProgressContext.Provider value={UserProgressProviderValue}>
      {children}
    </userProgressContext.Provider>
  )
}

export default userProgressContext
