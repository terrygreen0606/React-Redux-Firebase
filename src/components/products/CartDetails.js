import React, { useState } from 'react';

const CartDetails = ({ product, sumTotal }) => {
	const [cartProduct, setCartProduct] = useState(product);

	const increase = product => {
		product.count = product.count + 1;
		product.total = product.count * product.price;
		setCartProduct(product);
		sumTotal();
	};

	const decrease = product => {
		if (product.count > 0) {
			product.count = product.count - 1;
			product.total = product.count * product.price;
			setCartProduct(product);
			sumTotal();
		}
	};

	return (
		<div className="row center">
			<div className="col s12 m6">
				<img
					src={cartProduct.image_url}
					alt=""
					className="responsive-img"
				/>
			</div>
			<div className="col s12 m6">
				<div className="one-line-align">
					<h5>{cartProduct.title}</h5>
					<h5>${cartProduct.price}</h5>
				</div>
				<div className="one-line-align">
					<i
						className="material-icons cursor"
						onClick={() => decrease(cartProduct)}
					>
						remove_circle_outline
					</i>
					<span>{cartProduct.count}</span>
					<i
						className="material-icons cursor"
						onClick={() => increase(cartProduct)}
					>
						add_circle_outline
					</i>
					<span>${cartProduct.total}</span>
				</div>
			</div>
		</div>
	);
};

export default CartDetails;
