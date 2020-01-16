import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import ReactTooltip from 'react-tooltip';
import Pagination from 'react-js-pagination';

import {
	// loadProjects,
	deleteProject,
	clearAllProjects
} from '../../store/actions/projectActions';
import { adminStatus } from '../../store/actions/usersAction';
import ProjectSummary from './ProjectSummary';

const ProjectList = () => {
	/**
    |--------------------------------------------------
    | Pagination : Call loadProjects action with parameters current and limit

    const limit = 2;
	const dispatch = useDispatch();
	const firestore = useFirestore();
	const firstLoaded = firestore
		.collection('projects')
		.orderBy('createdAt', 'desc')
		.limit(limit);
	const dispatch = useDispatch();
	const next = useSelector(state => state.project.next);

	dispatch(loadProjects(firstLoaded, limit));
    return null;
    
    |--------------------------------------------------
    */

	const dispatch = useDispatch();

	// Get projects
	useFirestoreConnect({
		collection: 'projects',
		orderBy: ['createdAt', 'desc']
		// limit: projectsPerPage
	});
	const projects = useSelector(state => state.firestore.ordered.projects);

	// Built in Pagination
	const projectsPerPage = 3;
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastProject = currentPage * projectsPerPage;
	const indexOfFirstProject = indexOfLastProject - projectsPerPage;

	const currentProjects =
		projects && projects.slice(indexOfFirstProject, indexOfLastProject);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	// End Built in Pagination

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

	return (
		<div className="project-list section">
			<div className="red-text center">
				{deleteError ? <p>{deleteError}</p> : null}
			</div>
			{/* if projects exist, display. if not, don't display */}
			{currentProjects &&
				currentProjects.map(project => {
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
			{projects && (
				<Pagination
					activePage={currentPage}
					itemsCountPerPage={projectsPerPage}
					totalItemsCount={projects.length}
					pageRangeDisplayed={5}
					onChange={paginate}
				/>
			)}
		</div>
	);
};

export default ProjectList;
