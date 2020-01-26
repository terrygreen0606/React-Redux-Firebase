import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const ProductList = () => {
	// Get products from firestore
	useFirestoreConnect({
		collection: 'products'
	});
	const products = useSelector(state => state.firestore.ordered.products);

	return (
		<div className="product-list container">
			<div className="row">
				<div className="input-field col s6">
					<input
						id="search"
						type="text"
						className="validate"
						autoFocus
					/>
					<label htmlFor="search">Search Products</label>
				</div>
				<div className="input-field col s3 offset-s3">
					<Link
						to="/cart"
						className="btn btn-waves waves-effect cart-button"
					>
						<span className="hide-on-small-and-down">Cart</span>
						<i className="material-icons right">
							add_shopping_cart
						</i>
					</Link>
				</div>
			</div>
			<div className="row">
				{products &&
					products.map(product => {
						return (
							<div className="col s12 m6 l4" key={product.id}>
								<Link to={`/products/${product.id}`}>
									<div className="card hoverable grey-text text-darken-3">
										<div className="card-image">
											<img
												src={product.image_url}
												alt=""
												className="img-height"
											/>
										</div>
										<div className="card-content">
											<span className="card-title">
												{product.title}
											</span>
											<span className="card-title">
												${product.price}
											</span>
											<p>{product.desc}</p>
										</div>
									</div>
								</Link>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default ProductList;
