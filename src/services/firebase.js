import {firebase, FieldValue} from '../lib/firebase'

export async function doesUsernameExist(username){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();

    return result.docs.length > 0;
}
// get the user from the firestore where the userId (passed from the auth)

export async function getUserByUserId(userId){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();
    const user = result.docs.map((item)=>{
     return{
        ...item.data(),
     docId: item.id   
    }
    });

    return user;
}

export async function getSuggestedProfiles(userId){
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get()
    ;
    const profiles = result.docs.map((item)=>{
     return{
        ...item.data(),
     docId: item.id   
    }
    });

    return profiles;
}