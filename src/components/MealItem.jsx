import { useContext } from 'react'
import { currencyFormatter } from '../utils/formatter.js'
import Button from './UI/Button.jsx'
import CartContext from '../store/CartContext.jsx'

export default function mealItem({ meal }) {
  const CartCtx = useContext(CartContext)
  function HandleClick() {
    CartCtx.addItem(meal)
  }
  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-description ">{meal.description}</p>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={HandleClick}>Add to cart</Button>
        </p>
      </article>
    </li>
  )
}
