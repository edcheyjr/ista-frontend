import {useContext, useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

 
export default function Login() {
    const history = useHistory();
    const { firebase }= useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    // error
    const [error, setError] = useState('');
    const isInvalid = password ==='' || emailAddress === '';
    
    const handleLogin =async (event) =>{ 
        event.preventDefault();
        try{
          await firebase.auth().signInWithEmailAndPassword(emailAddress,password)
          history.push(ROUTES.DASHBOARD);
        }
        catch(error){
           setEmailAddress('');
           setPassword('');
           setError(error.message);
           setTimeout(()=>{
             setError('');
           },3000);
        }
    };
    useEffect(()=>{
        document.title = 'login-Instagram';
    },[]);
    return (
         <div className="container flex mx-auto max-w-screen-md items-center h-screen">
          <div className="flex w-3/5">
            <img src="/images/iphone-with-profile.jpg" alt="IGimage"/>
          </div>
        <div className="flex flex-col w-2/5">
          <div className="bg-white text-center p-4 rounded border border-gray-primary mb-4 " >
            <h1 className="flex justify-center w-full">
                <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4"/>
            </h1>


            {/* javascript  short circuiting on error handling*/}
            {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

            <form onSubmit ={handleLogin} method="POST">
                <input type="text" aria-label="Enter your email address " placeholder="Email address" className="text-sm text-gray-base w-full mb-2 mr-3 py-4 px-4 h-2 border border-gray-primary rounded" value={emailAddress} onChange={({target})=> setEmailAddress(target.value)}/>
                <input type="password" aria-label="Enter your password" placeholder="Password" className="text-sm text-gray-base w-full mb-2 mr-3 py-4 px-4 h-2 border border-gray-primary rounded" value={password} onChange={({target})=> setPassword(target.value)}/>
                <button 
                  disabled ={isInvalid} type ="submit" className={`bg-blue-500 text-white w-full rounded py-1 font-bold h-8 ${isInvalid && `opacity-50`}`}>Log In</button>

            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                <p className="text-sm">Don't have an account? {''}
                <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500">Sign up</Link>
                </p>
          </div>
          </div>

        </div>
    )
}
