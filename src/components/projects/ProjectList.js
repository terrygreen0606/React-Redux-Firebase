import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import { deleteProject } from '../../store/actions/projectActions';
import ProjectSummary from './ProjectSummary';

const ProjectList = () => {
	const dispatch = useDispatch();
	useFirestoreConnect({
		collection: 'projects',
		orderBy: ['createdAt', 'desc']
	});
	const projects = useSelector(state => state.firestore.ordered.projects);

	const deleteThisProject = projectId => {
		dispatch(deleteProject(projectId));
	};

	return (
		<div className="project-list section">
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
							<div className="row">
								<div className="col s3 offset-s9 project-actions">
									<i className="material-icons">edit</i>
									<i
										className="material-icons"
										onClick={() =>
											deleteThisProject(project.id)
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
