import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
	const price = `$${props.meal.price.toFixed(2)}`

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.meal.name}</h3>
				<p className={classes.description}>{props.meal.description}</p>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm/>
			</div>
		</li>
	);
};

export default MealItem;
