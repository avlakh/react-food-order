import { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
	const [isCheckout, setIsCheckout] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [didSubmit, setDidSubmit] = useState(false);
	const cartCtx = useContext(CartContext);

	const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
	const hasItems = cartCtx.items.length > 0;

	const removeCartItemHandler = (id) => {
		cartCtx.removeItem(id);
	};

	const addCartItemHandler = (item) => {
		const cartItem = { ...item, amount: 1 };
		cartCtx.addItem(cartItem);
	};

	const orderHandler = () => {
		setIsCheckout(true);
	};

	const submitOrderHandler = async (userData) => {
		setIsSubmitting(true);
		await fetch(
			'https://react-http-9003b-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
			{
				method: 'POST',
				body: JSON.stringify({
					user: userData,
					orderedItems: cartCtx.items,
				}),
			}
		);
		setIsSubmitting(false);
		setDidSubmit(true);
		cartCtx.clearCart();
	};

	const modalActions = (
		<div className={classes.actions}>
			<button
				className={classes['button--alt']}
				onClick={props.onHideCart}
			>
				Close
			</button>
			{hasItems && (
				<button className={classes.button} onClick={orderHandler}>
					Order
				</button>
			)}
		</div>
	);

	const cartModalContent = (
		<>
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
			{isCheckout && (
				<Checkout
					onCancel={props.onHideCart}
					onSubmit={submitOrderHandler}
				/>
			)}
			{!isCheckout && modalActions}
		</>
	);

	const isSubmittingModalContent = <p>Sending order data</p>;

	const didSubmitModalContent = (
		<>
			<p>
				Successfully sent the order! You will be contacted once we're
				done
			</p>
			<div className={classes.actions}>
				<button className={classes.button} onClick={props.onHideCart}>
					Close
				</button>
			</div>
		</>
	);

	return (
		<Modal onHideCart={props.onHideCart}>
			{!isSubmitting && !didSubmit && cartModalContent}
			{isSubmitting && isSubmittingModalContent}
			{didSubmit && didSubmitModalContent}
		</Modal>
	);
};

export default Cart;
