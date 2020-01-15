import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';
import RecoverPassword from './components/auth/RecoverPassword';
import UsersList from './components/users/UsersList';
import Homepage from './components/Homepage';

function App() {
	const loaded = useSelector(state => state.firebase.auth.isLoaded);
	if (loaded) {
		return (
			<Router>
				<div className="App">
					<Navbar />
					<Switch>
						<Route exact path="/" component={Homepage} />
						<Route exact path="/projects" component={Dashboard} />
						<Route
							exact
							path="/projects/:id"
							component={ProjectDetails}
						/>
						<Route path="/create" component={CreateProject} />

						<Route path="/signin" component={SignIn} />
						<Route path="/signup" component={SignUp} />
						<Route path="/recover" component={RecoverPassword} />

						<Route path="/users" component={UsersList} />
					</Switch>
				</div>
			</Router>
		);
	} else {
		return <div>Loading...</div>;
	}
}

export default App;
