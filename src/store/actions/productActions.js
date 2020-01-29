export const addNewProduct = product => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firestore = getFirestore();

	dispatch({ type: 'ADD_PRODUCT_START' });

	try {
		await firestore
			.collection('products')
			.add({ ...product, createdAt: new Date() });

		dispatch({ type: 'ADD_PRODUCT_SUCCESS' });
	} catch (err) {
		dispatch({ type: 'ADD_PRODUCT_ERROR', payload: err.message });
	}

	dispatch({ type: 'ADD_PRODUCT_END' });
};

// Delete product from firestore and storage
// export const deleteProduct = (product) => async (dispatch, getState, {getFirebase, getFirestore}) => {

// }

export const clearAllProducts = () => ({ type: 'CLEAN_PRODUCT_STATE' });
