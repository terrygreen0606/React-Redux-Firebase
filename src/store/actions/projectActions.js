export const createProject = project => (
	dispatch,
	getState,
	{ getFirestore }
) => {
	// make async calls to database
	const firestore = getFirestore();
	const profile = getState().firebase.profile;
	const authorId = getState().firebase.auth.uid;
	firestore
		.collection('projects')
		.add({
			...project,
			authorFirstName: profile.firstName,
			authorLastName: profile.lastName,
			authorId: authorId,
			createdAt: new Date()
		})
		.then(() => {
			dispatch({
				type: 'CREATE_PROJECT'
			});
		})
		.catch(err => {
			dispatch({
				type: 'CREATE_PROJECT_ERROR',
				payload: err
			});
		});
};
