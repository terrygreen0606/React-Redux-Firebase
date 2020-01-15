export const signUp = credentials => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();

	dispatch({ type: 'LOGIN_START' });

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
				email: res.user.email,
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
			payload: err.message
		});
	}

	dispatch({ type: 'LOGIN_END' });
};

export const signIn = credentials => async (
	dispatch,
	getState,
	{ getFirebase }
) => {
	const firebase = getFirebase();

	dispatch({ type: 'LOGIN_START' });

	try {
		await firebase
			.auth()
			.signInWithEmailAndPassword(
				credentials.email,
				credentials.password
			);

		dispatch({ type: 'LOGIN_SUCCESS' });
	} catch (err) {
		dispatch({
			type: 'LOGIN_ERROR',
			payload: err.message
		});
	}

	dispatch({ type: 'LOGIN_END' });
};

export const googleSignIn = () => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore }
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const provider = new firebase.auth.GoogleAuthProvider();

	dispatch({ type: 'LOGIN_START' });

	try {
		const res = await firebase.auth().signInWithPopup(provider);
		await firestore
			.collection('users')
			.doc(res.user.uid)
			.set({
				email: res.user.email,
				firstName: res.additionalUserInfo.profile.given_name,
				lastName: res.additionalUserInfo.profile.family_name,
				initials:
					res.additionalUserInfo.profile.given_name[0] +
					res.additionalUserInfo.profile.family_name[0]
			});

		dispatch({ type: 'GOOGLE_SIGNIN_SUCCESS' });
	} catch (err) {
		dispatch({ type: 'GOOGLE_SIGNIN_ERROR' });
	}

	dispatch({ type: 'LOGIN_END' });
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
				payload: err.message
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
