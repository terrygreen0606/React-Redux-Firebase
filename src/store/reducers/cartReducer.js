const initialState = {
	cartProducts: []
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_CART':
			return initialState;

		case 'ADD_TO_CART':
			return { cartProducts: [action.payload, ...state.cartProducts] };

		case 'REMOVE_FROM_CART':
			return {
				...state,
				cartProducts: state.cartProducts.filter(
					product => product.id !== action.payload
				)
			};

		default:
			return state;
	}
};

export default cartReducer;
