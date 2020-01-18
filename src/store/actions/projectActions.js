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

export const updateProject = project => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// make async calls to database
	const firestore = getFirestore();
	const profile = getState().firebase.profile;
	const authorId = getState().firebase.auth.uid;

	dispatch({ type: 'UPDATING_PROJECT_START' });

	try {
		await firestore
			.collection('projects')
			.doc(project.id)
			.update({
				title: project.title,
				content: project.content,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorId: authorId,
				createdAt: new Date()
			});

		dispatch({ type: 'UPDATE_PROJECT' });
	} catch (err) {
		dispatch({
			type: 'UPDATE_PROJECT_ERROR',
			payload: err.message
		});
	}

	dispatch({ type: 'UPDATING_PROJECT_END' });
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

export const paginateProjects = (navigation, snapshot, limit) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// Documentation for firebase pagination
	// https://firebase.google.com/docs/firestore/query-data/query-cursors

	const firestore = getFirestore();
	let projectQuery = null;
	let returnProjects = [];

	dispatch({ type: 'LOAD_PROJECTS_START' });

	try {
		switch (navigation) {
			case 'first':
				projectQuery = firestore
					.collection('projects')
					.orderBy('createdAt', 'desc')
					.limit(limit);
				break;

			case 'next':
				projectQuery = firestore
					.collection('projects')
					.orderBy('createdAt', 'desc')
					.startAfter(snapshot)
					.limit(limit);
				break;

			case 'prev':
				projectQuery = firestore
					.collection('projects')
					.orderBy('createdAt', 'desc')
					.endBefore(snapshot)
					.limitToLast(limit);
				break;

			default:
				projectQuery = null;
				break;
		}

		const documentSnapshots = await projectQuery.get();

		const firstVisible = documentSnapshots.docs[0];
		dispatch({ type: 'FIRST_PROJECT_SNAPSHOT', payload: firstVisible });

		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		dispatch({ type: 'LAST_PROJECT_SNAPSHOT', payload: lastVisible });

		// item.data() just includes only data. have to include item.id to use this id in the front-end
		documentSnapshots.docs.map(item =>
			returnProjects.push({ ...item.data(), id: item.id })
		);

		dispatch({ type: 'LOAD_PROJECTS_SUCCESS', payload: returnProjects });
	} catch (err) {
		dispatch({ type: 'LOAD_PROJECTS_ERROR', payload: err.message });
	}

	dispatch({ type: 'LOAD_PROJECTS_END' });
};

export const clearAllProjects = () => ({ type: 'CLEAR_ALL_PROJECTS' });
