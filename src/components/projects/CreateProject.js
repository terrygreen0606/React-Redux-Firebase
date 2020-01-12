import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { createProject } from '../../store/actions/projectActions';

class CreateProject extends Component {
	state = {
		title: '',
		content: ''
	};

	handleChange = e => {
		this.setState({ [e.target.id]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.createProject(this.state);
	};

	render() {
		const { auth } = this.props;

		if (!auth.uid) return <Redirect to="/signin" />;

		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h5 className="grey-text text-darken-3">
						Create a new Project
					</h5>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input
							type="text"
							id="title"
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="content">Content</label>
						<textarea
							id="content"
							className="materialize-textarea"
							onChange={this.handleChange}
						></textarea>
					</div>
					<div className="input-field">
						<button className="btn pink lighten-1 z-depth-0">
							Create
						</button>
					</div>
				</form>
			</div>
		);
	}
}

CreateProject.propTypes = {
	createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.firebase.auth
});

export default connect(mapStateToProps, { createProject })(CreateProject);
