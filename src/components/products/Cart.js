import React, { useState, useEffect } from 'react';

import CartDetails from './CartDetails';
import PaypalBtn from '../layout/PaypalButton';

const Cart = props => {
	// Get products in Cart
	const productsInCart = props.location.state;

	const [sum, setSum] = useState(0);

	const sumTotal = () => {
		let total = 0;
		productsInCart.map(product => (total += product.total));
		setSum(total);
	};

	useEffect(() => {
		sumTotal();
	});

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
						<p>Total Price : ${sum}</p>
						<PaypalBtn total={sum} />
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
