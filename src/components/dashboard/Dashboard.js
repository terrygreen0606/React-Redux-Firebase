import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';

const Dashboard = () => {
	useFirestoreConnect([
		{ collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
	]);
	const notifications = useSelector(
		state => state.firestore.ordered.notifications
	);
	const auth = useSelector(state => state.firebase.auth);

	if (!auth.uid) return <Redirect to="/signin" />;

	return (
		<div className="dashboard container">
			<div className="row">
				<div className="col s12 m6">
					<ProjectList />
				</div>
				<div className="col s12 m5 offset-m1">
					<Notifications notifications={notifications} />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
