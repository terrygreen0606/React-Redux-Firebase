const initialState = {
	users: [],
	isLoading: null,
	error: null,
	isAdmin: undefined,
	adminActionLoading: null,
	adminMsg: null,
	adminAdded: null,
	deletingUser: null,
	deletedMsg: null,
	isDeleted: null
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_ALL':
			return {
				users: [],
				isLoading: null,
				error: null,
				isAdmin: undefined,
				adminActionLoading: null,
				adminMsg: null,
				adminAdded: null,
				deletingUser: null,
				deletedMsg: null,
				isDeleted: null
			};

		// Adding Admin Role Section
		case 'ISADMIN':
			return { ...state, isAdmin: action.payload };

		case 'ADMIN_ACTION_START':
			return { ...state, adminActionLoading: true };

		case 'ADMIN_ACTION_END':
			return { ...state, adminActionLoading: false };

		case 'ADMIN_ADDED':
			return {
				...state,
				adminActionLoading: true,
				adminMsg: action.payload,
				adminAdded: true
			};

		case 'ADMIN_ADDED_ERROR':
			return {
				...state,
				adminActionLoading: true,
				adminMsg: action.payload,
				adminAdded: false
			};

		// Delete a user section
		case 'DELETE_USER_START':
			return { ...state, deletingUser: true };

		case 'DELETE_USER_END':
			return { ...state, deletingUser: false };

		case 'DELETE_USER_SUCCESS':
			return {
				...state,
				deletingUser: true,
				deletedMsg: action.payload,
				isDeleted: true
			};

		case 'DELETE_USER_ERROR':
			return {
				...state,
				deletingUser: true,
				deletedMsg: action.payload,
				isDeleted: false
			};

		// User section
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
