const initialState = {
	users: [],
	isLoading: null,
	error: null
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_ALL':
			return { users: [], isLoading: null, error: null };

		case 'USERS_LOADING_START':
			return { ...state, isLoading: true };

		case 'USER_LOAD_SUCCESS':
			return {
				...state,
				users: action.payload,
				isLoading: false,
				error: false
			};

		case 'USER_LOADING_END':
			return { ...state, isLoading: false, error: false };

		case 'USER_LOAD_ERROR':
			return { ...state, isLoading: false, error: action.payload };
		default:
			return state;
	}
};

export default usersReducer;
