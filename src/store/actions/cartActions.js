export const addToCart = product => (dispatch, getState) => {
	dispatch({ type: 'ADD_TO_CART', payload: product });
};

export const removeFromCart = product => (dispatch, getState) => {
	dispatch({ type: 'REMOVE_FROM_CART', payload: product.id });
};

export const clearCart = () => ({ type: 'CLEAR_CART' });
