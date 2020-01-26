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
import ProductList from './components/products/ProductList';
import Default from './components/Default';
import Cart from './components/products/Cart';
import ProductDetails from './components/products/ProductDetails';

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
						<Route exact path="/create" component={CreateProject} />
						<Route exact path="/update" component={CreateProject} />

						<Route exact path="/products" component={ProductList} />
						<Route
							exact
							path="/products/:id"
							component={ProductDetails}
						/>
						<Route exact path="/cart" component={Cart} />

						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/signup" component={SignUp} />
						<Route
							exact
							path="/recover"
							component={RecoverPassword}
						/>

						<Route exact path="/users" component={UsersList} />

						<Route component={Default} />
					</Switch>
				</div>
			</Router>
		);
	} else {
		return (
			<div className="container center">
				<p>Loading.......</p>
			</div>
		);
	}
}

export default App;
