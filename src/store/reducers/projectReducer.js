const initialState = {
	projects: [],
	projectError: null,
	creating: null,
	isCreated: false,
	deleteProjectError: null,
	isDeleted: false,
	isLoading: true,
	firstSnapshot: null,
	lastSnapshot: null,
	updating: false,
	isUpdated: false,
	condition: null
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CLEAR_ALL_PROJECTS':
			return initialState;

		case 'CLEAR_PROJECTS_STATUS':
			return {
				...state,
				isCreated: false,
				isUpdated: false,
				isDeleted: false
			};

		case 'CREATE_PROJECT':
			return { ...state, isCreated: true };

		case 'CREATING_PROJECT_START':
			return { ...state, creating: true };

		case 'CREATING_PROJECT_END':
			return { ...state, creating: false };

		case 'CREATE_PROJECT_ERROR':
			return { ...state, isCreated: false, projectError: action.payload };

		case 'UPDATE_PROJECT':
			return { ...state, isUpdated: true };

		case 'UPDATING_PROJECT_START':
			return { ...state, updating: true };

		case 'UPDATING_PROJECT_END':
			return { ...state, updating: false };

		case 'UPDATE_PROJECT_ERROR':
			return { ...state, isUpdated: false, projectError: action.payload };

		case 'LOAD_PROJECTS_START':
			return { ...state, isLoading: true };

		case 'LOAD_PROJECTS_SUCCESS':
			return {
				...state,
				projects: [...state.projects, ...action.payload]
			};

		case 'LOAD_PROJECTS_ERROR':
			return { ...state, projectError: action.payload };

		case 'FIRST_PROJECT_SNAPSHOT':
			return { ...state, firstSnapshot: action.payload };

		case 'LAST_PROJECT_SNAPSHOT':
			return {
				...state,
				lastSnapshot: action.payload,
				condition: action.condition
			};

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
