import classes from './Cart.module.css';

const Cart = (props) => {
	return (
		<div>
			<ul className={classes['cart-items']}>
				{[
					{
						id: 'c1',
						name: 'Sushi',
						amount: 2,
						price: 12.99,
					},
				].map((item) => (
					<li>{item.name}</li>
				))}
			</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>45.62</span>
			</div>
			<div className={classes.actions}>
				<button className={classes['button--alt']}>Close</button>
				<button className={classes.button}>Order</button>
			</div>
		</div>
	);
};

export default Cart;