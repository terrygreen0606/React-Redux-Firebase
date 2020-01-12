import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Notifications from './Notifications';
import ProjectList from '../projects/ProjectList';

const Dashboard = () => {
	const auth = useSelector(state => state.firebase.auth);

	if (!auth.uid) return <Redirect to="/signin" />;

	return (
		<div className="dashboard container">
			<div className="row">
				<div className="col s12 m6">
					<ProjectList />
				</div>
				<div className="col s12 m5 offset-m1">
					<Notifications />
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
