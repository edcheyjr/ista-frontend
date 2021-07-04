import {useContext, useState, useEffect} from 'react';
import {Link, useHistory } from "react-router-dom";
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import {doesUsernameExist} from '../services/firebase'

 
export default function SignUp() {
    const history = useHistory();
    const { firebase }= useContext(FirebaseContext);
    const [username, setUsername] = useState(''); 
    const [fullname, setFullName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
  

    // error
    const [error, setError] = useState('');
    const isInvalid = password ==='' || emailAddress === '' || fullname ==='' || username ==='';
    
    const handleSignUp = async (event) =>{ 
        event.preventDefault();
      
        const usernameExists = await doesUsernameExist(username);
        if(!usernameExists.length){ 
           try{
            const createdUserResult= await firebase
            .auth()
            .createUserWithEmailAndPassword(emailAddress, password);

            // authentication
            //  ->emailAddress & password & username (displayName)
            await createdUserResult.user.updateProfile({
                displayName: username 
            });
          
            // firebase user collection (create a document)
                await firebase.firestore().collection('users').add({
              userId: createdUserResult.user.uid,
              username: username.toLowerCase(),
              fullName: fullname,
              emailAddress: emailAddress.toLowerCase(),
              following: [],
              dateCreated: Date.now()
            });

            history.push(ROUTES.DASHBOARD)

          }catch(error){ 
            setFullName('');
            setUsername('');
            setEmailAddress('');
            setError(error.message);
          }
        }else{
          
          setError('That username is already taken, please take another')
          setTimeout(()=>setError('') ,3000);
        }
      };
    useEffect(()=>{
        document.title = 'sign up -Instagram';
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

            <form onSubmit ={handleSignUp} method="POST">
                <input type="text" aria-label="Enter your username" placeholder="Username" className="text-sm text-gray-base w-full mb-2 mr-3 py-4 px-4 h-2 border border-gray-primary rounded" onChange={({target})=> setUsername(target.value)} value={username}/>

                <input type="text" aria-label="Enter your full name" placeholder="Full name " className="text-sm text-gray-base w-full mb-2 mr-3 py-4 px-4 h-2 border border-gray-primary rounded" onChange={({target})=> setFullName(target.value)} value={fullname}/>
                <input type="email" aria-label="Enter your email address" placeholder="Email address" className="text-sm text-gray-base w-full mb-2 mr-3 py-4 px-4 h-2 border border-gray-primary rounded" onChange={({target})=> setEmailAddress(target.value)}
                value={emailAddress}
                />
                <input type="password" aria-label="Enter your password" placeholder="Password" className="text-sm text-gray-base w-full mb-2 mr-3 py-4 px-4 h-2 border border-gray-primary rounded" onChange={({target})=> setPassword(target.value)} value={password}/>
                <button 
                  disabled ={isInvalid} type ="submit" className={`bg-blue-500 text-white w-full rounded py-1 font-bold h-8 ${isInvalid && `opacity-50`}`}>Sign Up</button>

            </form>
          </div>
          <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                <p className="text-sm">Already Signed Up? {''}
                <Link to={ROUTES.LOGIN} className="font-bold text-blue-500">Login</Link>
                </p>
          </div>
          </div>

        </div>
    )
}
