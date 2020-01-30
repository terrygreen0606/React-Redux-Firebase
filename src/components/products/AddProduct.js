import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import uuid from 'uuid/v1';

import { storage } from '../../config/firebase';
import {
	addNewProduct,
	clearAllProducts
} from '../../store/actions/productActions';

const AddProduct = () => {
	const ref = React.createRef();
	const dispatch = useDispatch();
	const isAdded = useSelector(state => state.product.isAdded);

	// Initialize collapsible/accordion menu
	useEffect(() => {
		M.Collapsible.init(ref.current, {});
	}, [ref]);

	const inputData = {
		name: '',
		price: 0,
		desc: ''
	};

	const [newProduct, setNewProduct] = useState(inputData);
	const [uploaded, setUploaded] = useState({});
	const [progress, setProgress] = useState(0);
	const [uploadBtn, setUploadBtn] = useState('');

	// Handle input value changes
	const handleChange = e => {
		setNewProduct({
			...newProduct,
			[e.target.id]:
				e.target.id === 'price'
					? parseFloat(e.target.value)
					: e.target.value
		});
	};

	// Handle input type files upload changes
	const handleUpload = e => {
		setUploaded(e.target.files[0]);
	};

	// Submit a form to add a new product after uploading images on firebase storage
	const handleSubmit = e => {
		e.preventDefault();
		setUploadBtn('disabled');
		dispatch(clearAllProducts());
		const imageName = uuid();

		const uploadImage = storage.ref(`images/${imageName}`).put(uploaded);

		uploadImage.on(
			'state_changed',
			snapshot => {
				// Set progress bar percentage to show upload progress
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				);
				setProgress(progress);
			},
			err => {
				console.log(err);
			},
			() => {
				storage
					.ref('images')
					.child(imageName)
					.getDownloadURL()
					.then(url => {
						// Dispatch an action to add a new product.
						dispatch(
							addNewProduct({
								...newProduct,
								image_url: url,
								image_name: imageName
							})
						);

						// Set progress bar to 0% after 1.5 seconds
						setTimeout(() => {
							setProgress(0);
						}, 1500);
					});
			}
		);
	};

	// Clear input values after adding new product
	useEffect(() => {
		if (isAdded) {
			setUploadBtn('');
			document.getElementById('add-new-product').reset();
			M.toast({ html: 'New Product Added', classes: 'admin-msg' });
		}
	}, [isAdded]);

	// Component will unmount
	useEffect(() => {
		return () => {
			dispatch(clearAllProducts());
		};
	}, [dispatch]);

	return (
		<div className="row">
			<ul className="collapsible" ref={ref}>
				<li>
					<div className="collapsible-header">
						<i className="material-icons">filter_drama</i>
						Click me to add a new product.
					</div>
					<div className="collapsible-body white">
						<form
							className="col s12"
							onSubmit={handleSubmit}
							id="add-new-product"
						>
							<div className="input-field col s6">
								<input
									type="text"
									id="name"
									className="validate"
									required
									onChange={handleChange}
								/>
								<label htmlFor="name">Name</label>
							</div>
							<div className="input-field col s6">
								<input
									type="number"
									step="0.01"
									id="price"
									className="validate"
									required
									onChange={handleChange}
								/>
								<label htmlFor="price">Price</label>
							</div>
							<div className="input-field col s12">
								<label htmlFor="desc">Description</label>
								<textarea
									id="desc"
									required
									className="materialize-textarea"
									onChange={handleChange}
								></textarea>
							</div>
							<div className="input-field col s12">
								<input
									type="file"
									id="image"
									className="validate"
									required
									onChange={handleUpload}
								/>
								<div className="progress">
									<div
										className="determinate"
										style={{ width: `${progress}%` }}
									></div>
								</div>
							</div>
							<div className="input-field right">
								<button
									type="submit"
									className={`btn pink lighten-1 z-depth-0 ${uploadBtn}`}
								>
									Add new Product
								</button>
							</div>
						</form>
						<span>You can upload any images here.</span>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default AddProduct;
