import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import {
	adminStatus,
	addAdminRole,
	deleteUser
} from '../../store/actions/usersAction';

const UsersList = () => {
	const dispatch = useDispatch();
	useFirestoreConnect({
		collection: 'users'
	});

	useEffect(() => {
		dispatch(adminStatus());
	}, [dispatch]);

	// Users section
	const userStatus = useSelector(state => state.users.isAdmin);
	const loadedUsers = useSelector(state => state.firestore.ordered.users);

	const [users, setUsers] = useState([]);
	useEffect(() => {
		setUsers(loadedUsers);
	}, [loadedUsers]);

	// Admin section
	const adminMsg = useSelector(state => state.users.adminMsg);
	const deletedMsg = useSelector(state => state.users.deletedMsg);
	const adminActionLoading = useSelector(
		state => state.users.adminActionLoading
	);
	const deletingUser = useSelector(state => state.users.deletingUser);

	//Start Loading action css classes
	const [active, setActive] = useState('');
	const [deleting, setDeleting] = useState('');
	useEffect(() => {
		adminActionLoading ? setActive('disabled') : setActive('');
	}, [adminActionLoading]);

	useEffect(() => {
		deletingUser ? setDeleting('disabled') : setDeleting('');
	}, [deletingUser]);
	// End Loading CSS classes

	const addAdmin = email => {
		dispatch(addAdminRole(email));
	};

	const deleteThisUser = userId => {
		dispatch(deleteUser(userId));
	};

	const handleChange = e => {
		if (e.target.value === '') {
			setUsers(loadedUsers);
		} else {
			console.log(users);
			const filtered = users.filter(
				user => user.firstName === e.target.value
			);
			if (filtered.length !== 0) {
				console.log(filtered.length);
				console.log('if---------');
				setUsers(filtered);
			} else {
				setUsers(loadedUsers);
			}
			console.log(users);
		}
	};

	if (userStatus === null) return <Redirect to="/signin" />;

	return (
		<div className="container">
			<h4 className="center pink-text">Users List</h4>
			<div className="input-field search-bar">
				<input
					id="search"
					type="text"
					className="validate"
					onChange={handleChange}
				/>
				<label htmlFor="search">Search Users</label>
			</div>
			<table className="responsive-table">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map(user => {
							return (
								<tr key={user.id}>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.email}</td>
									<td>
										<button
											onClick={() => addAdmin(user.email)}
											className={`btn waves-effect waves-light ${active}`}
										>
											<i className="material-icons">
												create
											</i>
										</button>
										&nbsp;&nbsp;&nbsp;
										<button
											onClick={() =>
												deleteThisUser(user.id)
											}
											className={`btn waves-effect waves-light ${deleting}`}
										>
											<i className="material-icons">
												clear
											</i>
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			<div className="red-text center">
				{adminMsg ? <p>{adminMsg}</p> : null}
				{deletedMsg ? <p>{deletedMsg}</p> : null}
			</div>
		</div>
	);
};

export default UsersList;
