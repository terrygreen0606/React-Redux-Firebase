import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ReactTooltip from 'react-tooltip';
import Pagination from 'react-js-pagination';

import {
	addAdminRole,
	editUser,
	deleteUser,
	clearUsers
} from '../../store/actions/usersAction';
import WithUserStatus from '../hocs/WithUserStatus';

const UsersList = props => {
	// For Edit User Modal
	// End Edit User Modal
	const dispatch = useDispatch();
	useFirestoreConnect({
		collection: 'users'
	});

	/**
    |--------------------------------------------------
    | Users section
    | Check if the user is an admin
    | props.userStatus ? null->not logged in, false->logged in, but not an admin, true->admin
    |--------------------------------------------------
    */
	const loadedUsers = useSelector(state => state.firestore.ordered.users);

	const [users, setUsers] = useState([]);
	useEffect(() => {
		setUsers(loadedUsers);
	}, [loadedUsers]);
	// End users Section

	// Pagination with react-js-pagination plugin
	// Load all users at first and slice them with the index of first and last projects on the page.
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

	// Check editing a user action loading status
	// const editingUser = useSelector(state => state.user.editingUser)

	// Check deleting a user action loading status
	const deletingUser = useSelector(state => state.users.deletingUser);

	// Get loading status and disable buttons
	const [active, setActive] = useState('');
	const [deleting, setDeleting] = useState('');
	const [editing, setEditing] = useState('');
	useEffect(() => {
		adminActionLoading ? setActive('disabled') : setActive('');
	}, [adminActionLoading]);

	// useEffect(() => {
	// 	editingUser ? setEditing('disabled') : setEditing('');
	// }, [editingUser]);

	useEffect(() => {
		deletingUser ? setDeleting('disabled') : setDeleting('');
	}, [deletingUser]);
	// End Get loading status and disable buttons

	// Functions
	const addAdmin = email => {
		props.userStatus
			? dispatch(addAdminRole(email))
			: setAdminStatusMsg('You are not an admin.');
	};

	const editThisUser = userData => {
		// props.userStatus
		// 	? dispatch(editUser(userData))
		// 	: setAdminStatusMsg('You are not an admin.');
		console.log('editing user');
	};

	const deleteThisUser = userId => {
		props.userStatus
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
	if (props.userStatus === null) return <Redirect to="/signin" />;

	// If the user is not an admin, redirect to projects page
	if (props.userStatus === false) return <Redirect to="/projects" />;

	if (users) {
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
												onClick={() =>
													editThisUser(user.id)
												}
												data-tip="Edit this user"
												data-type="warning"
												className={`btn waves-effect waves-light ${editing}`}
											>
												<i className="material-icons">
													edit
												</i>
											</button>
											&nbsp;&nbsp;&nbsp;
											<button
												onClick={() =>
													addAdmin(user.email)
												}
												data-tip="Add the admin role"
												data-type="info"
												className={`btn waves-effect waves-light ${active}`}
											>
												<i className="material-icons">
													highlight
												</i>
											</button>
											{/* Added Tooltip here because it can not be a direct child of a table element */}
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
	} else {
		return (
			<div className="container center">
				<p>Loading Users...</p>
			</div>
		);
	}
};

export default WithUserStatus(UsersList);
