import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import uuid from 'uuid/v1';

import { storage } from '../../config/firebase';
import { addNewProduct } from '../../store/actions/productActions';

const AddProduct = () => {
	const ref = React.createRef();
	const dispatch = useDispatch();
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
	const [uploaded, setUploaded] = useState(null);
	const [progress, setProgress] = useState(0);

	const handleChange = e => {
		setNewProduct({
			...newProduct,
			[e.target.id]:
				e.target.id === 'price'
					? parseFloat(e.target.value)
					: e.target.value
		});
	};

	const handleUpload = e => {
		setUploaded(e.target.files[0]);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const imageName = uuid();

		const uploadImage = storage.ref(`images/${imageName}`).put(uploaded);

		uploadImage.on(
			'state_changed',
			snapshot => {
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
							addNewProduct({ ...newProduct, image_url: url })
						);
					});
			}
		);
	};

	return (
		<div className="row">
			<ul className="collapsible" ref={ref}>
				<li>
					<div className="collapsible-header">
						<i className="material-icons">filter_drama</i>
						Click me to add a new product.
					</div>
					<div className="collapsible-body">
						<form className="col s12" onSubmit={handleSubmit}>
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
								<div className="progress">
									<div
										className="determinate"
										style={{ width: `${progress}%` }}
									></div>
								</div>
								<input
									type="file"
									id="image"
									className="validate"
									required
									onChange={handleUpload}
								/>
							</div>
							<div className="input-field right">
								<button
									type="submit"
									className={`btn pink lighten-1 z-depth-0`}
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
