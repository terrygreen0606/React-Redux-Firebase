import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

const ProductList = () => {
	// Get products from firestore
	useFirestoreConnect({
		collection: 'products'
	});
	const products = useSelector(state => state.firestore.ordered.products);

	// Cart variables
	const [cartAdded, setCartAdded] = useState(0);
	const [cart, setCart] = useState([]);

	// Add to Cart clicked
	const addToMyCart = (product, ref) => {
		setCartAdded(cartAdded + 1);
		ref.current.classList.add('disabled');
		setCart([...cart, { ...product, count: 1, total: product.price }]);
	};

	if (products) {
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
					<div className="input-field col s6">
						<div className="col s5 offset-s7 no-padding">
							<Link
								to={{ pathname: '/cart', state: cart }}
								className="btn btn-waves waves-effect cart-btn"
							>
								<span className="hide-on-small-and-down">
									<b>My Cart</b>
								</span>
								<i className="material-icons cart-icon">
									add_shopping_carts
								</i>
								<span>
									<b>{cartAdded}</b>
								</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="row">
					{products &&
						products.map(product => {
							const ref = React.createRef();
							return (
								<div className="col s12 m4" key={product.id}>
									<div className="card hoverable">
										<div className="card-image">
											<img
												src={product.image_url}
												alt=""
												className="img-height"
											/>
											<button
												ref={ref}
												className="btn-floating halfway-fab waves-effect waves-light red hoverable"
												onClick={() =>
													addToMyCart(product, ref)
												}
											>
												<i className="material-icons">
													add
												</i>
											</button>
										</div>
										<Link
											to={{
												pathname: `/products/details`,
												state: { product }
											}}
										>
											<div className="card-content grey-text text-darken-3">
												<span className="card-title">
													{product.title}
												</span>
												<span className="card-title">
													${product.price}
												</span>
												<p className="truncate">
													{product.desc}
												</p>
											</div>
										</Link>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<p>Loading Products...</p>
			</div>
		);
	}
};

export default ProductList;
