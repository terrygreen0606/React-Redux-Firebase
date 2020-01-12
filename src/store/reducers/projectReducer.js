const initialState = {
	projects: [
		{ id: 1, title: 'title', content: 'content' },
		{ id: 2, title: 'title', content: 'content' },
		{ id: 3, title: 'title', content: 'content' }
	]
};

const projectReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_PROJECT':
			console.log('created project', action.payload);
			return state;
		case 'CREATE_PROJECT_ERROR':
			console.log('create project error', action.payload);
			return state;
		default:
			return state;
	}
};

export default projectReducer;
