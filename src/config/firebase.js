import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBwK1JErAPDO8wZKxnILh_5L1qFxBUqNwk',
	authDomain: 'react-redux-firebase-30e8e.firebaseapp.com',
	databaseURL: 'https://react-redux-firebase-30e8e.firebaseio.com',
	projectId: 'react-redux-firebase-30e8e',
	storageBucket: 'react-redux-firebase-30e8e.appspot.com',
	messagingSenderId: '505204832555',
	appId: '1:505204832555:web:a862224270e037831bad6e',
	measurementId: 'G-FMRBE1YRH9'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
const functions = firebase.functions();

export default firebase;
export { functions };
