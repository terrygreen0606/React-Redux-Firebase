import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/projects/:id" component={ProjectDetails} />
					<Route path="/create" component={CreateProject} />

					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
