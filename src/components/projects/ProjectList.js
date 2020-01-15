import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ReactTooltip from 'react-tooltip';

import {
	deleteProject,
	clearAllProjects
} from '../../store/actions/projectActions';
import { adminStatus } from '../../store/actions/usersAction';
import ProjectSummary from './ProjectSummary';

const ProjectList = () => {
	const dispatch = useDispatch();

	// Get projects
	useFirestoreConnect({
		collection: 'projects',
		orderBy: ['createdAt', 'desc']
	});
	const projects = useSelector(state => state.firestore.ordered.projects);

	// Get the current userId
	const userId = useSelector(state => state.firebase.auth.uid);

	// Get userStatus
	useEffect(() => {
		dispatch(adminStatus());
	}, [dispatch]);
	const userStatus = useSelector(state => state.users.isAdmin);

	// Get project delete error
	const deleteProjectError = useSelector(
		state => state.project.deleteProjectError
	);
	const [deleteError, setDeleteError] = useState([]);

	// Functions
	const deleteThisProject = (projectId, authorId) => {
		setDeleteError(deleteProjectError);
		if (authorId === userId || userStatus) {
			dispatch(deleteProject(projectId));
		} else {
			setDeleteError('You are not the author of this project');
		}
	};

	// ComponentWillUnmount
	useEffect(() => {
		return () => {
			dispatch(clearAllProjects());
			setDeleteError([]);
		};
	}, [dispatch]);

	return (
		<div className="project-list section">
			<div className="red-text center">
				{deleteError ? <p>{deleteError}</p> : null}
			</div>
			{/* if projects exist, display. if not, don't display */}
			{projects &&
				projects.map(project => {
					return (
						<div
							className="card z-depth-0 project-list"
							key={project.id}
						>
							<Link to={`/projects/${project.id}`}>
								<ProjectSummary project={project} />
							</Link>
							<ReactTooltip effect="solid" />
							<div className="row">
								<div className="col s3 offset-s9 project-actions">
									<i
										className="material-icons"
										data-tip="Edit the project"
										data-type="info"
									>
										edit
									</i>
									<i
										className="material-icons"
										data-tip="Delete the project"
										data-type="error"
										onClick={() =>
											deleteThisProject(
												project.id,
												project.authorId
											)
										}
									>
										delete
									</i>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default ProjectList;
