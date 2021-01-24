import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDsC01XoifOg8QH6Qz8-DS7KqbdAvGDius",
    authDomain: "validation-cb092.firebaseapp.com",
    databaseURL: "https://validation-cb092-default-rtdb.firebaseio.com",
    projectId: "validation-cb092",
    storageBucket: "validation-cb092.appspot.com",
    messagingSenderId: "295397413529",
    appId: "1:295397413529:web:d8e2687050e58e71915e08",
    measurementId: "G-LF13QGHFSS"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  firebaseApp.firestore().settings({ timestampsInSnapshots: true})
  firebase.analytics();

  export default firebaseApp.firestore()