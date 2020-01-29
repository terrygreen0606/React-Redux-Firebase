import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CartDetails from './CartDetails';
import PaypalBtn from '../layout/PaypalButton';
import { clearCart } from '../../store/actions/cartActions';

const Cart = () => {
	const dispatch = useDispatch();
	// Get products in Cart
	const productsInCart = useSelector(state => state.cart.cartProducts);

	const [sum, setSum] = useState(0);

	const sumTotal = () => {
		let total = 0;
		productsInCart.map(product => (total += product.total));
		setSum(total);
	};

	useEffect(() => {
		sumTotal();
	});

	// Disable PaypalBtn according to the checkbox
	const [paypalDisabled, setPaypal] = useState('paypal-disabled');
	const handleChange = e => {
		e.target.checked ? setPaypal('') : setPaypal('paypal-disabled');
	};

	if (productsInCart.length !== 0) {
		return (
			<div className="container cart padding-container">
				<div className="row">
					<div className="col s12 m8">
						<h4>Products in Cart</h4>

						{productsInCart.map(product => {
							return (
								<CartDetails
									product={product}
									key={product.id}
									sumTotal={sumTotal}
								/>
							);
						})}
					</div>
					<div className="col s12 m4 right-aligned">
						<h4>Checkout</h4>
						<h5>Total Price : ${sum}</h5>
						<button
							className="btn waves-effect"
							onClick={() => dispatch(clearCart())}
						>
							Clear Cart
						</button>
						<div className="input-field">
							<label className="pos-rel">
								<input
									type="checkbox"
									className="filled-in"
									onChange={handleChange}
								/>
								<span>
									I agree to the terms of policy and
									conditions
								</span>
							</label>
						</div>
						<div className={`${paypalDisabled}`}>
							<PaypalBtn total={sum} />
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center padding-container">
				There are no products to display in the cart, now.
			</div>
		);
	}
};

export default Cart;
