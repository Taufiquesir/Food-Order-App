import MealItem from './MealItem'
import useHttp from '../hooks/useHttp'
import Error from './Error'
const configObj = {}

export default function Meals() {
  const { data, isLoading, isError } = useHttp(
    'http://localhost:3000/meals',
    configObj,
    [],
  )
  // useEffect(() => {

  //   async function fetchMeals() {
  //     const res = await fetch('http://localhost:3000/meals')
  //     if (!res.ok) {
  //          do something
  //     }
  //     const meals = await res.json()
  //     setLoadedMeals(meals)
  //   }
  //   fetchMeals()
  // }, [])
  if (isLoading) {
    return <p className="centre">Data is loading...</p>
  }
  if (isError) {
    return <Error title="Failed to fetch meal" message={isError} />
  }
  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  )
}
