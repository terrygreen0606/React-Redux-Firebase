import React from 'react';

const ProductDetails = props => {
	// From ProductList Link tag
	const product = props.location.state.product;

	if (product) {
		return (
			<div className="container product-details">
				<h4>{product.name}</h4>
				<img src={product.image_url} alt="" />

				<h5>${product.price}</h5>
				<span>{product.desc}</span>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<p>Loading...</p>
			</div>
		);
	}
};

export default ProductDetails;
