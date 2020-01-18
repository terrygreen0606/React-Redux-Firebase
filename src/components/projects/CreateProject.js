import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
	createProject,
	clearAllProjects
} from '../../store/actions/projectActions';
import WithUserStatus from '../hocs/WithUserStatus';

class CreateProject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			content: '',
			creating: '',
			created: ''
		};
	}

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.setState({ created: '' });
		this.props.createProject({
			title: this.state.title,
			content: this.state.content
		});
	};

	componentDidUpdate(prevProps) {
		if (prevProps.creating !== this.props.creating) {
			this.setState({ creating: 'disabled' });
			if (this.props.isCreated) {
				this.setState({
					title: '',
					content: '',
					creating: '',
					created: 'The project is created'
				});
				this.props.history.push('/projects');
			}
		}
	}

	componentWillUnmount() {
		this.props.clearAllProjects();
	}

	render() {
		// This prop comes from router. Go and check ProjectList component's Link tag
		const project = this.props.location.state
			? this.props.location.state.project
			: null;
		if (project) {
			console.log(project.id);
		} else {
			console.log('no project');
		}

		const { projectError, isCreated, userStatus } = this.props;
		if (userStatus === null) return <Redirect to="/signin" />;

		return (
			<div className="container">
				<div className="red-text center">
					{projectError ? <p>{projectError}</p> : null}
					{isCreated ? <p>{this.state.created}</p> : null}
				</div>
				<form onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">
						{project
							? 'Update this project'
							: 'Create a new Project'}
					</h5>
					<div className="input-field">
						<label
							htmlFor="title"
							data-error="Wrong Title"
							data-success="right"
						>
							Title
						</label>
						<input
							type="text"
							id="title"
							value={project ? project.title : this.state.title}
							required
							autoFocus
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="content" data-error="Wrong Content">
							Content
						</label>
						<textarea
							id="content"
							required
							value={
								project ? project.content : this.state.content
							}
							className="materialize-textarea"
							onChange={this.handleChange}
						></textarea>
					</div>
					<div className="input-field">
						<button
							type="submit"
							className={`btn pink lighten-1 z-depth-0 ${this.state.creating}`}
						>
							{project ? 'Update' : 'Create'}
						</button>
					</div>
				</form>
			</div>
		);
	}
}

CreateProject.propTypes = {
	createProject: PropTypes.func.isRequired,
	clearAllProjects: PropTypes.func.isRequired,
	creating: PropTypes.bool,
	isCreated: PropTypes.bool
};

const mapStateToProps = state => ({
	projectError: state.project.projectError,
	creating: state.project.creating,
	isCreated: state.project.isCreated
});

export default WithUserStatus(
	connect(mapStateToProps, { createProject, clearAllProjects })(CreateProject)
);
