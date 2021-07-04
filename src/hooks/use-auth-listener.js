import {useState, useEffect, useContext} from 'react';
import FirebaseContext from '../context/firebase';

export default function useAuthListener() {
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase} = useContext(FirebaseContext);
    useEffect(()=>{
    const listener = firebase.auth().onAuthStateChanged(
        // we have a user .. therfore we can store te user i localstorage;
        (authUser)=>{
        if(authUser){
            // we have a user... therfore we can store the user in localstorage
            localStorage.setItem('authUser',JSON.stringify(authUser));
        }
        else{
            // we don't therefore clear the localstorage 
            localStorage.removeItem('authUser');
            setUser(null);
        }
     });
     return () => listener();

    },[firebase]);


    return {user}; 
}
