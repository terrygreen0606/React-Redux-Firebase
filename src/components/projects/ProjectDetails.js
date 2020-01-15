import React from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import firebase from '../../config/firebase';

const ProjectDetails = props => {
	// props automatically comes from react router in app.js

	useFirestoreConnect({
		collection: 'projects'
	});
	const id = props.match.params.id;
	const projects = useSelector(state => state.firestore.data.projects);

	const project = projects ? projects[id] : null;

	// if not logged in, redirect to sign in page.
	const user = firebase.auth().currentUser;
	if (!user) return <Redirect to="/signin" />;

	if (project) {
		return (
			<div className="container section project-details">
				<div className="card z-depth-0">
					<div className="card-content">
						<span className="card-title">{project.title}</span>
						<p>{project.content}</p>
					</div>
					<div className="card-action grey lighten-4 grey-text">
						<div>
							Posted by {project.authorFirstName}{' '}
							{project.authorLastName}
						</div>
						<div>
							{moment(project.createdAt.toDate()).format(
								'MMMM Do, YYYY, h:mm:ss a'
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<p>Loading project...</p>
			</div>
		);
	}
};

export default ProjectDetails;
