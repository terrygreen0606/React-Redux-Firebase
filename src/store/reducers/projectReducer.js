const initialState = {
	projects: []
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_PROJECT':
			return state;
		case 'CREATE_PROJECT_ERROR':
			console.log('create project error', action.payload);
			return state;
		default:
			return state;
	}
};

export default projectReducer;
