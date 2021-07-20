// import './wdyr'; // <--- first import

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTE from './constants/routes';
import UserContext from './context/user';
import userAuthListener from './hooks/use-auth-listener';
import ProtectedRoute from './helpers/protector-route';
import IsUserLoggedIn from './helpers/is-user-logged-in';
import Loading from './components/Loading.js';

// use lazyloading to code split our bundle project
const Login = lazy(() => import('./pages/login'));
const SignUp = lazy(() => import('./pages/signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));


function App() {
	const { user } = userAuthListener()
	return (
		<UserContext.Provider value={{ user }}>
			<Router>
				<Suspense fallback={<Loading/>}>
					<Switch>
						<IsUserLoggedIn
							user={user}
							loggedInPath={ROUTE.DASHBOARD}
							path={ROUTE.LOGIN}>
							<Login />
						</IsUserLoggedIn>
						<IsUserLoggedIn
							user={user}
							loggedInPath={ROUTE.DASHBOARD}
							path={ROUTE.LOGIN}>
							<SignUp />
						</IsUserLoggedIn>

						<Route path={ROUTE.PROFILE} component={Profile} />
						<ProtectedRoute user={user} path={ROUTE.DASHBOARD} exact>
							<Dashboard />
						</ProtectedRoute>
						<Route component={NotFound} />
					</Switch>
				</Suspense>
			</Router>
		</UserContext.Provider>
	)
}
export default App
// architeture
// client side rendered app using :react cra
// folder structure
// src
// ->firebase database
//  react-loading-skeleton
// ->components,
//  helpers ,
// costants,
// context,
// lib(firebase exist  here)
// services (firebase function here)

//TODO:
// React Testing Library tests
// Cypress tests
