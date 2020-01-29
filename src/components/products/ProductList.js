import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Pagination from 'react-js-pagination';

import WithUserStatus from '../hocs/WithUserStatus';
import AddProduct from './AddProduct';
import { addToCart } from '../../store/actions/cartActions';

const ProductList = props => {
	const { userStatus } = props;
	const dispatch = useDispatch();

	// Get products from firestore
	useFirestoreConnect({
		collection: 'products'
	});
	const loadedProducts = useSelector(
		state => state.firestore.ordered.products
	);

	const [products, setProducts] = useState([]);
	useEffect(() => {
		setProducts(loadedProducts);
	}, [loadedProducts]);

	// Pagination with react-js-pagination plugin
	// Load all users at first and slice them with the index of first and last projects on the page.
	const itemsPerPage = 12;
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentItems =
		products && products.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	// End Pagination

	// Cart variables
	const cartNumber = useSelector(state => state.cart.cartProducts.length);

	// Add to Cart clicked
	const addToMyCart = product => {
		dispatch(addToCart({ ...product, count: 1, total: product.price }));
	};

	if (currentItems) {
		return (
			<div className="product-list container padding-container">
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
								to="/cart"
								className="btn btn-waves waves-effect cart-btn"
							>
								<span className="hide-on-small-and-down">
									<b>My Cart</b>
								</span>
								<i className="material-icons cart-icon">
									add_shopping_carts
								</i>
								<span>
									<b>{cartNumber ? cartNumber : 0}</b>
								</span>
							</Link>
						</div>
					</div>
				</div>
				{userStatus ? <AddProduct /> : null}
				<div className="row">
					{currentItems &&
						currentItems.map(product => {
							return (
								<div className="col s12 m4 l3" key={product.id}>
									<div className="card hoverable">
										<div className="card-image">
											<img
												src={product.image_url}
												alt=""
												className="img-height"
											/>
											<button
												className="btn-floating halfway-fab waves-effect waves-light red hoverable"
												onClick={() =>
													addToMyCart(product)
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
													{product.name}
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
				{currentItems.length !== 0 ? (
					<Pagination
						activePage={currentPage}
						itemsCountPerPage={itemsPerPage}
						totalItemsCount={products.length}
						pageRangeDisplayed={5}
						onChange={paginate}
					/>
				) : null}
			</div>
		);
	} else {
		return (
			<div className="container center">
				<div className="preloader-wrapper active">
					<div className="spinner-layer spinner-blue-only">
						<div className="circle-clipper left">
							<div className="circle"></div>
						</div>
						<div className="gap-patch">
							<div className="circle"></div>
						</div>
						<div className="circle-clipper right">
							<div className="circle"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default WithUserStatus(ProductList);
