export const createProject = project => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// make async calls to database
	const firestore = getFirestore();
	const profile = getState().firebase.profile;
	const authorId = getState().firebase.auth.uid;

	dispatch({ type: 'CREATING_PROJECT_START' });

	try {
		await firestore.collection('projects').add({
			...project,
			authorFirstName: profile.firstName,
			authorLastName: profile.lastName,
			authorId: authorId,
			createdAt: new Date()
		});

		dispatch({ type: 'CREATE_PROJECT' });
	} catch (err) {
		dispatch({
			type: 'CREATE_PROJECT_ERROR',
			payload: err.message
		});
	}

	dispatch({ type: 'CREATING_PROJECT_END' });
};

export const deleteProject = projectId => (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// make async calls to database
	const firestore = getFirestore();
	firestore
		.collection('projects')
		.doc(projectId)
		.delete()
		.then(() => {
			dispatch({ type: 'DELETE_PROJECT_SUCCESS' });
		})
		.catch(err => {
			dispatch({ type: 'DELETE_PROJECT_ERROR', payload: err.message });
		});
};

export const clearAllProjects = () => ({ type: 'CLEAR_ALL_PROJECTS' });
