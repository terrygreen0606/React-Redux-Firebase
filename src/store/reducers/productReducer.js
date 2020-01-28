const initialState = {
	error: null,
	isAdding: false,
	isAdded: false
};

const productReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAN_PRODUCT_STATE':
			return initialState;

		case 'ADD_PRODUCT_START':
			return { ...state, isAdding: true };

		case 'ADD_PRODUCT_SUCCESS':
			return { ...state, isAdded: true };

		case 'ADD_PRODUCT_ERROR':
			return { ...state, isAdded: false, error: action.payload };

		case 'ADD_PRODUCT_END':
			return { ...state, isAdding: false };

		default:
			return state;
	}
};

export default productReducer;
