const initialState = {
	cartProducts: []
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_CART':
			return initialState;

		case 'ADD_TO_CART':
			return { cartProducts: [action.payload, ...state.cartProducts] };

		case 'ADD_NUMBER':
			// Gave the index 0 because the newly added product goes to the first place of the array
			// ADD_TO_CART case adds the new product at the first place of its array
			const product = state.cartProducts[0];
			product.count = product.count + 1;
			product.total = product.count * product.price;
			return state;

		default:
			return state;
	}
};

export default cartReducer;
