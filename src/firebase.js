import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyCZguruS5zmdmFoPRNJOWoAJRfSpl9ZhrU",
  authDomain: "whats-app-clone-da2ae.firebaseapp.com",
  databaseURL: "https://whats-app-clone-da2ae.firebaseio.com",
  projectId: "whats-app-clone-da2ae",
  storageBucket: "whats-app-clone-da2ae.appspot.com",
  messagingSenderId: "1077505599893",
  appId: "1:1077505599893:web:e765443f54ccad38f36e9c",
  measurementId: "G-3ZFS90JW1M",
};


const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
export {auth , provider};
export default db;



