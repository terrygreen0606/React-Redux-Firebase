export const loadUsers = () => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firestore = getFirestore();
	const users = [];

	dispatch({ type: 'USERS_LOADING_START' });

	firestore.collection('users').onSnapshot(
		res => {
			const changes = res.docChanges();
			changes.forEach(change => {
				if (change.type === 'added') {
					users.push(change.doc.data());
				}
			});
			dispatch({ type: 'USER_LOAD_SUCCESS', payload: users });
			dispatch({ type: 'USERS_LOADING_END' });
		},
		err => {
			dispatch({ type: 'USER_LOAD_ERROR', payload: err.message });
			dispatch({ type: 'USERS_LOADING_END' });
		}
	);
};
