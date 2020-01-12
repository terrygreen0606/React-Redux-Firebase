const initialState = {
	authError: null,
	isLoggedIn: false
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_ERROR':
			console.log('login failed');
			return { ...state, authError: 'Login Failed', isLoggedIn: false };

		case 'LOGIN_SUCCESS':
			console.log('login success');
			return { ...state, authError: null, isLoggedIn: true };

		case 'SIGNOUT_SUCCESS':
			console.log('signout success');
			return { ...state, authError: null, isLoggedIn: false };

		case 'SIGNOUT_ERROR':
			console.log('signout error');
			return {
				...state,
				authError: action.payload.message,
				isLoggedIn: true
			};

		case 'SIGNUP_ERROR':
			console.log('signup error');
			return {
				...state,
				authError: action.payload.message,
				isLoggedIn: false
			};

		case 'SIGNUP_SUCCESS':
			console.log('signup success');
			return { ...state, authError: 'Signup Success', isLoggedIn: true };

		default:
			return state;
	}
};

export default authReducer;
