export const addToCart = product => (dispatch, getState) => {
	// Find if the current cart has product
	// If it has, adds the product.count by 1
	// Else, add the new product object to the array
	const currentItems = getState().cart.cartProducts;
	const filtered = currentItems.find(item => item.id === product.id);

	if (filtered) {
		dispatch({ type: 'ADD_NUMBER' });
	} else {
		dispatch({ type: 'ADD_TO_CART', payload: product });
	}
};

export const clearCart = () => ({ type: 'CLEAR_CART' });
