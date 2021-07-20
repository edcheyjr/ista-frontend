import {useEffect, useState, useContext} from 'react';
import UserContext from '../context/user';
import{getUserByUserId, getPhotos} from '../services/firebase'


export default function usePhotos() {
  const [photos, setPhotos] = useState(null)
  const {
   user: {uid: userId = ''}
  } = useContext(UserContext);

  useEffect(()=>{
   async function getTimelinePhotos(){

    //  exapmple [2,1,5] <- 2 being raphael
    const [{following}]= await getUserByUserId(userId);
    let followingUserPhotos = [];

    // does the user actually follows anyone
    if(following.length > 0){

     followingUserPhotos = await getPhotos(userId, following);
    }
    // re-arrange array to be the newest photos first by dateCreated
    followingUserPhotos =  followingUserPhotos.sort((a, b)=>b.dateCreated - a.dateCreated);
    setPhotos(followingUserPhotos);
   }

  //  console.log(userId);
   getTimelinePhotos();
  },[userId])

 return {photos};
}
