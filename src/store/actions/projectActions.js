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

export const loadProjects = (current, limit) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// make async calls to database
	const returnProjects = [];
	const firestore = getFirestore();

	dispatch({ type: 'LOAD_PROJECTS_START' });

	try {
		const documentSnapshots = await current.get();
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];

		const next = await firestore
			.collection('projects')
			.orderBy('createdAt', 'desc')
			.startAfter(lastVisible)
			.limit(limit)
			.get();

		dispatch({ type: 'CURRENT_PROJECT_QUERY', payload: next });

		next.docs.map(item => returnProjects.push(item.data()));

		dispatch({ type: 'LOAD_PROJECTS_SUCCESS', payload: returnProjects });
	} catch (err) {
		dispatch({ type: 'LOAD_PROJECTS_ERROR', payload: err.message });
	}

	dispatch({ type: 'LOAD_PROJECTS_END' });
};

export const clearAllProjects = () => ({ type: 'CLEAR_ALL_PROJECTS' });
