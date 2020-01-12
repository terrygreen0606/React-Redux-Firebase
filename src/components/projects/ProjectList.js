import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';

import ProjectSummary from './ProjectSummary';

const ProjectList = () => {
	useFirestoreConnect('projects');
	const projects = useSelector(state => state.firestore.ordered.projects);
	return (
		<div className="project-list section">
			{/* if projects exist, display. if not, don't display */}
			{projects &&
				projects.map(project => {
					return (
						<Link to={`/projects/${project.id}`} key={project.id}>
							<ProjectSummary project={project} />
						</Link>
					);
				})}
		</div>
	);
};

export default ProjectList;
