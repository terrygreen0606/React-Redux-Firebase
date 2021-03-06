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
import usersReducer from './usersReducer';
import productReducer from './productReducer';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
	auth: authReducer,
	project: projectReducer,
	product: productReducer,
	cart: cartReducer,
	users: usersReducer,
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
