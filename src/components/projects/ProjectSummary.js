import React from 'react';

const ProjectSummary = ({ project }) => {
	return (
		<div className="card z-depth-0 project-summary">
			<div className="card-content grey-text text-darken-3">
				<span className="card-title">{project.title}</span>
				<p>Posted by Terry</p>
				<p className="grey-text">Jan 12th, 2020</p>
			</div>
		</div>
	);
};

export default ProjectSummary;
