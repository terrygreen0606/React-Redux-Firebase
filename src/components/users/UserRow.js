import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import {
	addAdminRole,
	editUser,
	deleteUser,
	clearUserMsgs
} from '../../store/actions/usersAction';
import WithUserStatus from '../hocs/WithUserStatus';

const UserRow = props => {
	const fNameRef = React.createRef();
	const lNameRef = React.createRef();

	const { user, userStatus } = props;
	const dispatch = useDispatch();

	// Assign user props to state with the changes of input
	const [currentUser, setUser] = useState(user);
	const handleChange = e => {
		setUser({ ...currentUser, [e.target.name]: e.target.value });
	};

	const isRoleLoading = useSelector(state => state.users.adminActionLoading);
	const isEditLoading = useSelector(state => state.users.editingUser);
	const isDeleteLoading = useSelector(state => state.users.deletingUser);

	// Add admin role Function and loading status disabled button
	const [adding, setAdding] = useState('');
	const [editing, setEditing] = useState('');
	const [deleting, setDeleting] = useState('');

	const addAdmin = () => {
		dispatch(clearUserMsgs());
		setAdding('disabled');
		userStatus
			? dispatch(addAdminRole(user.email))
			: console.log('you are not an admin');
	};
	// End admin role

	// Edit the user
	const editThisUser = () => {
		dispatch(clearUserMsgs());
		setEditing('disabled');
		userStatus
			? dispatch(editUser(currentUser))
			: console.log('you are not an admin');
	};

	// Delete the user
	const deleteThisUser = () => {
		dispatch(clearUserMsgs());
		setDeleting('disabled');
		userStatus
			? dispatch(deleteUser(user.id))
			: console.log('you are not an admin');
	};

	// Status after editing user
	const isEdited = useSelector(state => state.users.isEdited);

	// ComponentDidUpdate
	useEffect(() => {
		if (!isRoleLoading) {
			setAdding('');
		}
		if (!isEditLoading) {
			setEditing('');
		}
		if (!isDeleteLoading) {
			setDeleting('');
		}
	}, [isRoleLoading, isEditLoading, isDeleteLoading]);

	return (
		<tr>
			<td>
				<input
					ref={fNameRef}
					type="text"
					value={currentUser.firstName}
					name="firstName"
					onChange={handleChange}
				/>
			</td>
			<td>
				<input
					ref={lNameRef}
					type="text"
					value={currentUser.lastName}
					name="lastName"
					onChange={handleChange}
				/>
			</td>
			<td>{currentUser.email}</td>
			<td>
				<button
					onClick={editThisUser}
					data-tip="Edit this user"
					data-type="warning"
					className={`btn waves-effect waves-light ${editing}`}
				>
					<i className="material-icons">edit</i>
				</button>
				&nbsp;&nbsp;&nbsp;
				<button
					onClick={addAdmin}
					data-tip="Add the admin role"
					data-type="info"
					className={`btn waves-effect waves-light ${adding}`}
				>
					<i className="material-icons">highlight</i>
				</button>
				{/* Added Tooltip here because it can not be a direct child of a table element */}
				<ReactTooltip effect="solid" />
				&nbsp;&nbsp;&nbsp;
				<button
					data-tip="Delete this user"
					data-type="error"
					onClick={deleteThisUser}
					className={`btn waves-effect waves-light ${deleting}`}
				>
					<i className="material-icons">delete</i>
				</button>
			</td>
		</tr>
	);
};

export default WithUserStatus(UserRow);
