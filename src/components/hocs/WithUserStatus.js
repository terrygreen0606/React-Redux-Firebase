import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { adminStatus } from '../../store/actions/usersAction';

const WithUserStatus = OriginalComponent => {
	const WrappedComponent = props => {
		// HOC to get the user status
		// userStatus ? null->not logged in, false->logged in, but not an admin, true->admin
		const dispatch = useDispatch();
		useEffect(() => {
			dispatch(adminStatus());
		}, [dispatch]);
		const userStatus = useSelector(state => state.users.isAdmin);

		return <OriginalComponent userStatus={userStatus} {...props} />;
	};

	return WrappedComponent;
};

export default WithUserStatus;
