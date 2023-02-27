import { useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const removeCartItemHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const addCartItemHandler = (item) => {
		const cartItem = {...item, amount: 1}
		cartCtx.addItem(cartItem);
	};

	return (
		<Modal onHideCart={props.onHideCart}>
			<ul className={classes['cart-items']}>
				{cartCtx.items.map((item) => (
					<CartItem
						key={item.id}
						name={item.name}
						amount={item.amount}
						price={item.price}
						onRemove={removeCartItemHandler.bind(null, item.id)}
						onAdd={addCartItemHandler.bind(null, item)}
					/>
				))}
			</ul>
			<div className={classes.total}>
				<span>Total Amount</span>
				<span>{totalAmount}</span>
			</div>
			<div className={classes.actions}>
				<button
					className={classes['button--alt']}
					onClick={props.onHideCart}
				>
					Close
				</button>
				{hasItems && <button className={classes.button}>Order</button>}
			</div>
		</Modal>
	);
};

export default Cart;
