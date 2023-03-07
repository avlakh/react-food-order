import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useEffect, useState } from 'react';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch(
				'https://react-http-9003b-default-rtdb.europe-west1.firebasedatabase.app/meals.json'
			);
			const responseData = await response.json();

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					meal: responseData[key],
				});
			}

			setMeals(loadedMeals);
			setIsLoading(false);
		};

		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		});
	}, []);

	if (isLoading) {
		return (
			<section className={classes.mealsLoading}>
				<p>Loading...</p>
			</section>
		);
	}

	if (httpError) {
		return (
			<section className={classes.mealsError}>
				<p>{httpError}</p>
			</section>
		);
	}

	const mealsList = meals.map((meal) => (
		<MealItem id={meal.id} key={meal.id} meal={meal.meal} />
	));

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{mealsList}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
