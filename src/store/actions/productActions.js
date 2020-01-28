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

		dispatch({ type: 'ADD_PRODUCT_SUCESS' });
	} catch (err) {
		dispatch({ type: 'ADD_PRODUCT_ERROR', payload: err.message });
	}

	dispatch({ type: 'ADD_PRODUCT_END' });
};
