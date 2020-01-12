const initialState = {
	authError: null
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_ERROR':
			console.log('login failed');
			return { ...state, authError: 'Login Failed' };

		case 'LOGIN_SUCCESS':
			console.log('login success');
			return { ...state, authError: null };

		case 'SIGNOUT_ERROR':
			console.log('signout error');
			return {
				...state,
				authError: action.payload.message
			};

		case 'SIGNUP_ERROR':
			console.log('signup error');
			return {
				...state,
				authError: action.payload.message
			};

		case 'SIGNUP_SUCCESS':
			console.log('signup success');
			return { ...state, authError: 'Signup Success' };

		default:
			return state;
	}
};

export default authReducer;
