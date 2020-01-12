export const signUp = credentials => (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	firebase
		.auth()
		.createUserWithEmailAndPassword(credentials.email, credentials.password)
		.then(res => {
			firestore
				.collection('users')
				.doc(res.user.uid)
				.set({
					firstName: credentials.first_name,
					lastName: credentials.last_name,
					initials:
						credentials.first_name[0] + credentials.last_name[0]
				});
		})
		.then(() => {
			dispatch({
				type: 'SIGNUP_SUCCESS'
			});
		})
		.catch(err => {
			dispatch({
				type: 'SIGNUP_ERROR',
				payload: err
			});
		});
};

export const signIn = credentials => (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	firebase
		.auth()
		.signInWithEmailAndPassword(credentials.email, credentials.password)
		.then(() => {
			dispatch({
				type: 'LOGIN_SUCCESS'
			});
		})
		.catch(err => {
			dispatch({
				type: 'LOGIN_ERROR',
				payload: err
			});
		});
};

export const signOut = () => (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	firebase
		.auth()
		.signOut()
		.then(() => {
			// This is because of permission error after loggin out
			window.location.reload();
		})
		.catch(err => {
			dispatch({
				type: 'SIGNOUT_ERROR',
				payload: err
			});
		});
};
