import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
	const cartCtx = useContext(CartContext);

	const price = `$${props.meal.price.toFixed(2)}`;

	const addToCartHandler = (amount) => {
		cartCtx.addItem({
			id: props.id,
			name: props.meal.name,
			amount: amount,
			price: props.meal.price,
		});
	};

	return (
		<li className={classes.meal}>
			<div>
				<h3>{props.meal.name}</h3>
				<p className={classes.description}>{props.meal.description}</p>
				<div className={classes.price}>{price}</div>
			</div>
			<div>
				<MealItemForm
					id={props.meal.id}
					onAddToCart={addToCartHandler}
				/>
			</div>
		</li>
	);
};

export default MealItem;
