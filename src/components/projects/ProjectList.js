import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';

import {
	deleteProject,
	clearAllProjects,
	paginateProjects
} from '../../store/actions/projectActions';
import ProjectSummary from './ProjectSummary';
import WithUserStatus from '../hocs/WithUserStatus';

const ProjectList = props => {
	// Firebase Pagination
	// Load Firebase every time the next button is clicked
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

	// Get project delete error
	const deleteProjectError = useSelector(
		state => state.project.deleteProjectError
	);
	const [deleteError, setDeleteError] = useState([]);

	// Delete Project from firestore and ui (using createRef to get the element and remove from ui)
	const isDeleted = useSelector(state => state.project.isDeleted);
	const deleteThisProject = (projectId, authorId, ref) => {
		if (authorId === userId || props.userStatus) {
			dispatch(deleteProject(projectId)); // Remove from Firebase
			ref.current.remove(); // Remove from UI
		} else {
			setDeleteError('You are not the author of this project');
		}
	};
	// Set delete success or error message
	useEffect(() => {
		isDeleted
			? setDeleteError('The project is deleted')
			: setDeleteError(deleteProjectError);
	}, [isDeleted, deleteProjectError]);
	//End Delete Project

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
			{projects.map(project => {
				const ref = React.createRef();
				return (
					<div
						className="card z-depth-0 project-summary"
						key={project.id}
						ref={ref}
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
											project.authorId,
											ref
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
			<div className="pagination-buttons">
				<button
					className="btn waves-effect"
					onClick={() => paginate('prev')}
				>
					<i className="material-icons left">chevron_left</i>
					Prev
				</button>
				<button
					className="btn waves-effect"
					onClick={() => paginate('next')}
				>
					Next
					<i className="material-icons right">chevron_right</i>
				</button>
			</div>
		</div>
	);
};

export default WithUserStatus(ProjectList);
