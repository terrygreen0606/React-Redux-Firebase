const initialState = {
	authError: null,
	emailVerified: {
		error: null,
		loading: false
	},
	recoverPassword: {
		error: null,
		loading: false
	}
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEANUP_AUTH':
			return {
				...state,
				authError: null,
				emailVerified: {
					...state.emailVerified,
					loading: false,
					error: null
				},
				recoverPassword: {
					error: null,
					loading: false
				}
			};
		case 'LOGIN_ERROR':
			return { ...state, authError: action.payload };

		case 'LOGIN_SUCCESS':
			return { ...state, authError: null };

		case 'GOOGLE_SIGNIN_SUCCESS':
			return state;

		case 'GOOGLE_SIGNIN_ERROR':
			return state;

		case 'SIGNOUT_ERROR':
			return {
				...state,
				authError: action.payload.message
			};

		case 'SIGNUP_ERROR':
			return {
				...state,
				authError: action.payload.message
			};

		case 'SIGNUP_SUCCESS':
			return { ...state, authError: 'Signup Success' };

		case 'VERIFY_START':
			return {
				...state,
				emailVerified: { ...state.emailVerified, loading: true }
			};

		case 'VERIFY_SUCCESS':
			return {
				...state,
				emailVerified: {
					...state.emailVerified,
					loading: false,
					error: false
				}
			};

		case 'VERIFY_FAILED':
			return {
				...state,
				emailVerified: {
					...state.emailVerified,
					loading: false,
					error: action.payload
				}
			};

		case 'RECOVER_START':
			return {
				...state,
				recoverPassword: { ...state.recoverPassword, loading: true }
			};

		case 'RECOVER_SUCCESS':
			return {
				...state,
				recoverPassword: {
					...state.recoverPassword,
					loading: false,
					error: false
				}
			};

		case 'RECOVER_FAILED':
			return {
				...state,
				recoverPassword: {
					...state.recoverPassword,
					loading: false,
					error: action.payload
				}
			};

		default:
			return state;
	}
};

export default authReducer;
