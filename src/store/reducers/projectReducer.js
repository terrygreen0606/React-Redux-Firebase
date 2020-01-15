const initialState = {
	projects: [],
	projectError: null,
	isCreated: null,
	deleteProjectError: null,
	isDeleted: null
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_ALL_PROJECTS':
			return {
				projects: [],
				projectError: null,
				isCreated: null,
				deleteProjectError: null,
				isDeleted: null
			};

		case 'CREATE_PROJECT':
			return { ...state, isCreated: true };

		case 'CREATE_PROJECT_ERROR':
			return { ...state, isCreated: false, projectError: action.payload };

		case 'DELETE_PROJECT_SUCCESS':
			return { ...state, isDeleted: true };

		case 'DELETE_PROJECT_ERROR':
			return {
				...state,
				isDeleted: false,
				deleteProjectError: action.payload
			};

		default:
			return state;
	}
};

export default projectReducer;
