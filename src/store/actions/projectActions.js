export const createProject = project => (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// make async calls to database
	const firestore = getFirestore();
	firestore
		.collection('projects')
		.add({
			...project,
			authorFirstName: 'Green',
			authorLastName: 'Terry',
			authorId: 1234,
			createdAt: new Date()
		})
		.then(() => {
			dispatch({
				type: 'CREATE_PROJECT',
				payload: project
			});
		})
		.catch(err => {
			dispatch({
				type: 'CREATE_PROJECT_ERROR',
				payload: err
			});
		});
};
