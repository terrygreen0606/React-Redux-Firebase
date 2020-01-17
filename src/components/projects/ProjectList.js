import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import {
	deleteProject,
	clearAllProjects,
	paginateProjects
} from '../../store/actions/projectActions';
import { adminStatus } from '../../store/actions/usersAction';
import ProjectSummary from './ProjectSummary';

const ProjectList = () => {
	// Firebase Pagination
	// Load Firebase when the next button is clicked
	const limit = 3;
	const dispatch = useDispatch();

	const firstSnapshot = useSelector(state => state.project.firstSnapshot);
	const lastSnapshot = useSelector(state => state.project.lastSnapshot);

	useEffect(() => {
		dispatch(paginateProjects('first', null, limit));
	}, [dispatch, limit]);

	const paginate = navigation => {
		navigation === 'prev'
			? dispatch(paginateProjects(navigation, firstSnapshot, limit))
			: dispatch(paginateProjects(navigation, lastSnapshot, limit));
	};
	// End Pagination

	// Get projects
	// const projects = useSelector(state => state.firestore.ordered.projects);     //This is for the case of using useFirestoreConnect plugin
	const projects = useSelector(state => state.project.projects);

	// Get the current userId
	const userId = useSelector(state => state.firebase.auth.uid);

	// Get userStatus -> admin or not
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

	const projectLoading = useSelector(state => state.project.isLoading);
	if (projectLoading) {
		return <div>Loading....</div>;
	}

	return (
		<div className="project-list section">
			<div className="red-text center">
				{deleteError ? <p>{deleteError}</p> : null}
			</div>
			{/* if projects exist, display. if not, don't display */}
			{projects.map((project, index) => {
				return (
					<div className="card z-depth-0 project-summary" key={index}>
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
			<button
				className="btn waves-effect"
				onClick={() => paginate('prev')}
			>
				Prev
			</button>
			<button
				className="btn waves-effect"
				onClick={() => paginate('next')}
			>
				Next
			</button>
		</div>
	);
};

export default ProjectList;
