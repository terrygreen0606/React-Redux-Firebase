import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ReactTooltip from 'react-tooltip';
import Pagination from 'react-js-pagination';

import {
	adminStatus,
	addAdminRole,
	deleteUser,
	clearUsers
} from '../../store/actions/usersAction';

const UsersList = () => {
	const dispatch = useDispatch();
	useFirestoreConnect({
		collection: 'users'
	});

	/**
    |--------------------------------------------------
    | Users section
    | Check if the user is an admin
    | userStatus ? null->not logged in, false->logged in, but not an admin, true->admin
    |--------------------------------------------------
    */
	useEffect(() => {
		dispatch(adminStatus());
	}, [dispatch]);
	const userStatus = useSelector(state => state.users.isAdmin);
	const loadedUsers = useSelector(state => state.firestore.ordered.users);

	const [users, setUsers] = useState([]);
	useEffect(() => {
		setUsers(loadedUsers);
	}, [loadedUsers]);
	// End users Section

	// Pagination
	const itemsPerPage = 7;
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentItems =
		users && users.slice(indexOfFirstItem, indexOfLastItem);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	// End Pagination

	// Success or Error Message section
	const adminMsg = useSelector(state => state.users.adminMsg);
	const deletedMsg = useSelector(state => state.users.deletedMsg);
	const [adminStatusMsg, setAdminStatusMsg] = useState('');

	// Check adding admin role action loading status
	const adminActionLoading = useSelector(
		state => state.users.adminActionLoading
	);

	// Check deleting a user action loading status
	const deletingUser = useSelector(state => state.users.deletingUser);

	// Get loading status and disable buttons
	const [active, setActive] = useState('');
	const [deleting, setDeleting] = useState('');
	useEffect(() => {
		adminActionLoading ? setActive('disabled') : setActive('');
	}, [adminActionLoading]);

	useEffect(() => {
		deletingUser ? setDeleting('disabled') : setDeleting('');
	}, [deletingUser]);
	// End Get loading status and disable buttons

	// Functions
	const addAdmin = email => {
		userStatus
			? dispatch(addAdminRole(email))
			: setAdminStatusMsg('You are not an admin.');
	};

	const deleteThisUser = userId => {
		userStatus
			? dispatch(deleteUser(userId))
			: setAdminStatusMsg('You are not an admin.');
	};

	// Filtering for user search
	const handleChange = e => {
		if (e.target.value === '') {
			setUsers(loadedUsers);
		} else {
			const filtered = users.filter(
				user => user.firstName === e.target.value
			);
			if (filtered.length !== 0) {
				setUsers(filtered);
			} else {
				setUsers(loadedUsers);
			}
		}
	};

	// ComponentWillUnmount
	useEffect(() => {
		return () => {
			dispatch(clearUsers());
		};
	}, [dispatch]);

	// If the user is not logged in, redirect to login page
	if (userStatus === null) return <Redirect to="/signin" />;

	// If the user is not an admin, redirect to projects page
	if (userStatus === false) return <Redirect to="/projects" />;

	return (
		<div className="container">
			<div className="red-text center">
				{adminMsg ? <p>{adminMsg}</p> : null}
				{deletedMsg ? <p>{deletedMsg}</p> : null}
				{adminStatusMsg ? <p>{adminStatusMsg}</p> : null}
			</div>
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
					{currentItems &&
						currentItems.map(user => {
							return (
								<tr key={user.id}>
									<td>{user.firstName}</td>
									<td>{user.lastName}</td>
									<td>{user.email}</td>
									<td>
										<button
											onClick={() => addAdmin(user.email)}
											data-tip="Add the admin role"
											data-type="info"
											className={`btn waves-effect waves-light ${active}`}
										>
											<i className="material-icons">
												create
											</i>
										</button>
										<ReactTooltip effect="solid" />
										&nbsp;&nbsp;&nbsp;
										<button
											data-tip="Delete this user"
											data-type="error"
											onClick={() =>
												deleteThisUser(user.id)
											}
											className={`btn waves-effect waves-light ${deleting}`}
										>
											<i className="material-icons">
												delete
											</i>
										</button>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
			{users && (
				<Pagination
					activePage={currentPage}
					itemsCountPerPage={itemsPerPage}
					totalItemsCount={users.length}
					pageRangeDisplayed={5}
					onChange={paginate}
				/>
			)}
		</div>
	);
};

export default UsersList;
