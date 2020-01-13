import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import firebase from '../../config/firebase';
// import { loadUsers } from '../../store/actions/usersAction';

const UsersList = () => {
	useFirestoreConnect({
		collection: 'users'
	});

	const users = useSelector(state => state.firestore.ordered.users);

	// This is for dispatching users action.
	// Currently I am using useFirestoreConnect.
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	dispatch(loadUsers());
	// }, [dispatch]);
	// const users = useSelector(state => state.users.users);
	// console.log(users);

	const user = firebase.auth().currentUser;
	if (!user) return <Redirect to="/signin" />;

	return (
		<div>
			<p>This is users list page</p>
			{users &&
				users.map(user => {
					return <p key={user.id}>{user.email}</p>;
				})}
		</div>
	);
};

export default UsersList;
