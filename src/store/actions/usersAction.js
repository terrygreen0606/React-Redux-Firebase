import { functions } from '../../config/firebase';

export const adminStatus = () => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	firebase.auth().onAuthStateChanged(user => {
		if (user) {
			// User is logged in
			// Check if the loggedin user is admin or not
			// returns true or undefined
			user.getIdTokenResult().then(idTokenResult => {
				if (idTokenResult.claims.admin) {
					dispatch({ type: 'ISADMIN', payload: true });
				} else {
					dispatch({ type: 'ISADMIN', payload: false });
				}
			});
		} else {
			// User is logged out.
			dispatch({ type: 'ISADMIN', payload: null });
		}
	});
};

// Add the admin role to the user
export const addAdminRole = email => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({ type: 'ADMIN_ACTION_START' });

	const addFunction = functions.httpsCallable('addAdminRole');
	try {
		const res = await addFunction({ email });
		dispatch({ type: 'ADMIN_ADDED', payload: res.data.message });
	} catch (err) {
		dispatch({ type: 'ADMIN_ADDED_ERROR', payload: err.message });
	}

	dispatch({ type: 'ADMIN_ACTION_END' });
};

// Delete a user
export const deleteUser = userId => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	dispatch({ type: 'DELETE_USER_START' });

	const deleteFunction = functions.httpsCallable('deleteUser');
	try {
		const res = await deleteFunction({ userId });
		dispatch({ type: 'DELETE_USER', payload: res.data.message });
	} catch (err) {
		dispatch({ type: 'DELETE_USER_ERROR', payload: err.message });
	}

	dispatch({ type: 'DELETE_USER_END' });
};
