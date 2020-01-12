import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { firebaseReducer, getFirebase } from 'react-redux-firebase';
import {
	firestoreReducer,
	reduxFirestore,
	getFirestore
} from 'redux-firestore';

import firebase from '../../config/firebase';
import authReducer from './authReducer';
import projectReducer from './projectReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
});

const store = createStore(
	rootReducer,
	compose(
		applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
		reduxFirestore(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
