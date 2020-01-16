const initialState = {
	projects: [],
	projectError: null,
	creating: null,
	isCreated: null,
	deleteProjectError: null,
	isDeleted: null,
	isLoading: null,
	current: null
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_ALL_PROJECTS':
			return {
				projects: [],
				projectError: null,
				creating: null,
				isCreated: null,
				deleteProjectError: null,
				isDeleted: null,
				isLoading: null,
				current: null
			};

		case 'CREATE_PROJECT':
			return { ...state, isCreated: true };

		case 'CREATING_PROJECT_START':
			return { ...state, creating: true };

		case 'CREATING_PROJECT_END':
			return { ...state, creating: false };

		case 'CREATE_PROJECT_ERROR':
			return { ...state, isCreated: false, projectError: action.payload };

		case 'LOAD_PROJECTS_START':
			return { ...state, isLoading: true };

		case 'LOAD_PROJECTS_SUCCESS':
			return { ...state, projects: action.payload };

		case 'LOAD_PROJECTS_ERROR':
			return { ...state, projectError: action.payload };

		case 'CURRENT_PROJECT_QUERY':
			return { ...state, current: action.payload };

		case 'LOAD_PROJECTS_END':
			return { ...state, isLoading: false };

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
