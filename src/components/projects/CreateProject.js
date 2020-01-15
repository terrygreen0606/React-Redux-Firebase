import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
	createProject,
	clearAllProjects
} from '../../store/actions/projectActions';

class CreateProject extends Component {
	state = {
		title: '',
		content: '',
		creating: '',
		created: ''
	};

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
		// this.props.history.push('/projects');
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
			}
		}
	}

	componentWillUnmount() {
		this.props.clearAllProjects();
	}

	render() {
		const { auth, projectError, isCreated } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		return (
			<div className="container">
				<div className="red-text center">
					{projectError ? <p>{projectError}</p> : null}
					{isCreated ? <p>{this.state.created}</p> : null}
				</div>
				<form onSubmit={this.handleSubmit}>
					<h5 className="grey-text text-darken-3">
						Create a new Project
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
							value={this.state.title}
							required
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
							value={this.state.content}
							className="materialize-textarea"
							onChange={this.handleChange}
						></textarea>
					</div>
					<div className="input-field">
						<button
							type="submit"
							className={`btn pink lighten-1 z-depth-0 ${this.state.creating}`}
						>
							Create
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
	auth: state.firebase.auth,
	projectError: state.project.projectError,
	creating: state.project.creating,
	isCreated: state.project.isCreated
});

export default connect(mapStateToProps, { createProject, clearAllProjects })(
	CreateProject
);
