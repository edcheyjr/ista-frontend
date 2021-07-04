import './wdyr'; // <--- first import

import { lazy, Suspense } from 'react';
import {BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import * as ROUTE from './constants/routes';
import UserContext from './context/user';
import userAuthListener from './hooks/use-auth-listener';

// use lazyloading to code split our bundle project
const Login =lazy(()=> import("./pages/login"));
const SignUp =lazy(()=> import("./pages/signup"));
const Dashboard =lazy(()=> import("./pages/dashboard"));

const NotFound =lazy(()=> import("./pages/not-found"));

function App() {
    const {user} = userAuthListener();
    return ( 
        <UserContext.Provider value ={{user}}>
        <Router>
            <Suspense fallback={<p>loading...</p>}>
            <Switch> 
                <Route path={ROUTE.LOGIN} component={Login}/> 
                <Route path={ROUTE.SIGN_UP} component={SignUp}/> 
                <Route path={ROUTE.DASHBOARD} component={Dashboard}/> 
                <Route component={NotFound}/> 
            </Switch>
            </Suspense>
        </Router>
        </UserContext.Provider>
    );
}  
export default App;
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