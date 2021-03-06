import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import Pagination from 'react-js-pagination';
import M from 'materialize-css/dist/js/materialize.min.js';

import { clearUsers } from '../../store/actions/usersAction';
import WithUserStatus from '../hocs/WithUserStatus';
import Userrow from './UserRow';

const UsersList = props => {
	const dispatch = useDispatch();
	useFirestoreConnect({
		collection: 'users'
	});

	/*
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

	// Messages after actions
	const adminMsg = useSelector(state => state.users.adminMsg);
	const editedMsg = useSelector(state => state.users.editedMsg);
	const deletedMsg = useSelector(state => state.users.deletedMsg);

	// Filtering for user search
	let timeout = null;
	const handleChange = e => {
		clearTimeout(timeout);

		// To use event in a callback, e.persist() should have to be called
		e.persist();

		timeout = setTimeout(() => {
			// Callback
			const filtered = users.filter(user => {
				return (
					user.firstName === e.target.value.trim() ||
					user.lastName === e.target.value.trim()
				);
			});
			if (e.target.value === '') {
				setUsers(loadedUsers);
			} else {
				setUsers(filtered);
			}
		}, 1000);
	};

	// ComponentWillUnmount
	useEffect(() => {
		return () => {
			dispatch(clearUsers());
		};
	}, [dispatch]);

	// Popup Message after updates
	if (adminMsg) {
		M.toast({ html: adminMsg, classes: 'admin-msg' });
	}
	if (editedMsg) {
		M.toast({ html: editedMsg, classes: 'edited-msg' });
	}
	if (deletedMsg) {
		M.toast({ html: deletedMsg, classes: 'deleted-msg' });
	}
	// End popup message

	// If the user is not logged in, redirect to login page
	if (props.userStatus === null) return <Redirect to="/signin" />;

	// If the user is not an admin, redirect to projects page
	if (props.userStatus === false) return <Redirect to="/projects" />;

	if (users) {
		return (
			<div className="container user-list">
				<h4 className="center">Users List</h4>
				<div className="input-field search-bar">
					<input
						id="search"
						type="text"
						className="validate"
						onChange={handleChange}
						autoFocus
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
								return <Userrow key={user.id} user={user} />;
							})}
					</tbody>
				</table>
				<Pagination
					activePage={currentPage}
					itemsCountPerPage={itemsPerPage}
					totalItemsCount={users.length}
					pageRangeDisplayed={5}
					onChange={paginate}
				/>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<div className="preloader-wrapper active">
					<div className="spinner-layer spinner-blue-only">
						<div className="circle-clipper left">
							<div className="circle"></div>
						</div>
						<div className="gap-patch">
							<div className="circle"></div>
						</div>
						<div className="circle-clipper right">
							<div className="circle"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default WithUserStatus(UsersList);
