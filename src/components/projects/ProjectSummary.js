import React from 'react';
import moment from 'moment';

const ProjectSummary = ({ project }) => {
	return (
		<div className="card-content grey-text text-darken-3 project-summary">
			<span className="card-title">{project.title}</span>
			<p>
				Posted by {project.authorFirstName} {project.authorLastName}{' '}
			</p>
			<span className="grey-text">
				{moment(project.createdAt.toDate()).format(
					'MMMM Do, YYYY, h:mm:ss a'
				)}
			</span>
		</div>
	);
};

export default ProjectSummary;
