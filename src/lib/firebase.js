import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';
// import the seed file
// already imported done its job


const config = {
     apiKey: "AIzaSyD2e6ljhZzbA1KVODqSRI7Io1GlO9A3ThU",
    authDomain: "instagram-2-e3d19.firebaseapp.com",
    projectId: "instagram-2-e3d19",
    storageBucket: "instagram-2-e3d19.appspot.com",
    messagingSenderId: "237072155651",
    appId: "1:237072155651:web:58be4bf348144e0313ba36"
};

const firebase = Firebase.initializeApp(config);
const {FieldValue} = Firebase.firestore;

// call the seed file only ONCE!
// seedDatabase(firebase)

export {firebase, FieldValue}