import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, removeFromCart } from '../../store/actions/cartActions';

const ProductSingle = ({ product }) => {
	const dispatch = useDispatch();

	const cartProducts = useSelector(state => state.cart.cartProducts);
	const filtered = cartProducts.find(item => item.id === product.id);
	const [btnValue, setBtnValue] = useState('Add to cart');
	const [iconValue, setIconValue] = useState('add');
	useEffect(() => {
		if (filtered) {
			setBtnValue('remove');
			setIconValue('remove');
		} else {
			setBtnValue('add to cart');
			setIconValue('add');
		}
	}, [filtered]);

	// Add to Cart clicked
	const handleClick = () => {
		filtered
			? dispatch(removeFromCart(product))
			: dispatch(
					addToCart({ ...product, count: 1, total: product.price })
			  );
	};

	return (
		<div className="col s12 m4 l3">
			<div className="card hoverable center">
				<Link
					to={{
						pathname: `/products/details`,
						state: { product }
					}}
				>
					<div className="card-image">
						<img
							src={product.image_url}
							alt=""
							className="img-height"
						/>
					</div>
					<div className="card-content grey-text text-darken-3">
						<span className="card-title truncate">
							{product.name}
						</span>
						<span className="card-title">${product.price}</span>
						<p className="truncate">{product.desc}</p>
					</div>
				</Link>
				<button
					className={`btn waves-effect waves-light`}
					onClick={handleClick}
				>
					<i className="material-icons left">{iconValue}</i>
					{btnValue}
				</button>
			</div>
		</div>
	);
};

export default ProductSingle;
