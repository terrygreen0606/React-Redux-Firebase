export const signUp = credentials => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();

	// Here, can dispatch an action that tells the signing up process has started
	try {
		const res = await firebase
			.auth()
			.createUserWithEmailAndPassword(
				credentials.email,
				credentials.password
			);

		// Send verification email
		const user = firebase.auth().currentUser;
		await user.sendEmailVerification();

		await firestore
			.collection('users')
			.doc(res.user.uid)
			.set({
				firstName: credentials.first_name,
				lastName: credentials.last_name,
				initials: credentials.first_name[0] + credentials.last_name[0]
			});

		dispatch({
			type: 'SIGNUP_SUCCESS'
		});
	} catch (err) {
		dispatch({
			type: 'SIGNUP_ERROR',
			payload: err
		});
	}

	// Here, can dispatch an action that tells the signing up process has ended.
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

export const verifyEmail = () => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	dispatch({ type: 'VERIFY_START' });
	try {
		const user = firebase.auth().currentUser;
		await user.sendEmailVerification();
		dispatch({ type: 'VERIFY_SUCCESS' });
	} catch (err) {
		dispatch({ type: 'VERIFY_FAILED', payload: err.message });
	}
};

export const sendRecoveryPassword = email => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();
	dispatch({ type: 'RECOVERY_START' });
	try {
		await firebase.auth().sendPasswordResetEmail(email.email);
		dispatch({ type: 'RECOVERY_SUCCESS' });
	} catch (err) {
		dispatch({ type: 'RECOVERY_FAILED', payload: err.message });
	}
};

export const cleanupAuth = () => ({ type: 'CLEANUP_AUTH' });
