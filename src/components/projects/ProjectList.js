import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import M from 'materialize-css/dist/js/materialize.min.js';

import {
	deleteProject,
	clearAllProjects,
	paginateProjects
} from '../../store/actions/projectActions';
import ProjectSummary from './ProjectSummary';
import WithUserStatus from '../hocs/WithUserStatus';

const ProjectList = props => {
	// Get Projects
	const projects = useSelector(state => state.project.projects);

	// Firebase Pagination
	// Load Firebase every time the next button is clicked
	const limit = 3;
	const dispatch = useDispatch();

	const firstSnapshot = useSelector(state => state.project.firstSnapshot);
	const lastSnapshot = useSelector(state => state.project.lastSnapshot);

	// Get the next array status
	const condition = useSelector(state => state.project.condition);

	useEffect(() => {
		dispatch(paginateProjects('first', null, limit));

		// ComponentWillUnmount
		return () => {
			dispatch(clearAllProjects());
			setDeleteError([]);
		};
	}, [dispatch]);

	const paginate = navigation => {
		navigation === 'prev'
			? dispatch(paginateProjects(navigation, firstSnapshot, limit))
			: dispatch(paginateProjects(navigation, lastSnapshot, limit));
	};
	// End Pagination

	// Get the current userId
	const userId = useSelector(state => state.firebase.auth.uid);

	// Get project delete error
	const deleteProjectError = useSelector(
		state => state.project.deleteProjectError
	);
	const [deleteError, setDeleteError] = useState(null);

	// Delete Project from firestore and ui (using createRef to get the element and remove from ui)
	const isDeleted = useSelector(state => state.project.isDeleted);

	const deleteThisProject = (projectId, authorId, ref) => {
		if (authorId === userId || props.userStatus) {
			dispatch(deleteProject(projectId)); // Remove from Firebase
			ref.current.remove(); // Remove from UI
			ReactTooltip.hide(); // Hide the tooltip
		} else {
			setDeleteError('You are not the author of this project');
		}
	};
	// End Deleting project

	// Set delete success or error message
	useEffect(() => {
		isDeleted
			? setDeleteError('The project is deleted')
			: setDeleteError(deleteProjectError);
	}, [isDeleted, deleteProjectError]);
	//End Delete Project

	// Popup message after deleting action
	useEffect(() => {
		if (deleteError) {
			// Dispatch clear projects status here
			M.toast({ html: deleteError, classes: 'project-msg' });
		}
	}, [deleteError]);
	// End popup message

	const projectsLoading = useSelector(state => state.project.isLoading);

	if (projects.length === 0) {
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
	} else {
		return (
			<div className="project-list section">
				<ReactTooltip effect="solid" />

				{projects &&
					projects.map(project => {
						const ref = React.createRef();
						return (
							<div
								className="card project-summary hoverable"
								key={project.id}
								ref={ref}
							>
								<Link to={`/projects/${project.id}`}>
									<ProjectSummary project={project} />
								</Link>

								<div className="row">
									<div className="col s3 offset-s9 project-actions">
										{/* sending params in Link tag. Go and check CreateProject component */}
										<Link
											to={{
												pathname: '/update',
												state: { project }
											}}
										>
											<i
												className="material-icons"
												data-tip="Edit"
												data-class="edit-project"
											>
												edit
											</i>
										</Link>

										<i
											className="material-icons"
											data-tip="Delete"
											data-class="delete-project"
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

				{/* <div className="pagination-buttons">
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
				</div> */}
				<div className="center">
					<button
						className={`btn waves-effect ${
							condition === 0 || projectsLoading ? 'disabled' : ''
						}`}
						onClick={() => paginate('next')}
					>
						{condition === 0 ? 'No More' : 'Load More'}
						<i className="material-icons right">arrow_drop_down</i>
					</button>
				</div>
			</div>
		);
	}
};

export default WithUserStatus(ProjectList);
