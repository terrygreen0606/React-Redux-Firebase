import React, { useState, useEffect } from 'react';
import CartDetails from './CartDetails';

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
					<div className="col s12 m4 card">
						<h4>Checkout</h4>
						<p>Total Price : ${sum}</p>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container">
				There are no added products in the cart
			</div>
		);
	}
};

export default Cart;
