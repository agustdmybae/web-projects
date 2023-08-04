import firebase from 'firebase/compat/app';

const firebaseConfig = {
    apiKey: "AIzaSyAyc_B5goVh0ACxNMfvmai9gdGVFGbrwcU",
    authDomain: "concert-view.firebaseapp.com",
    projectId: "concert-view",
    storageBucket: "concert-view.appspot.com",
    messagingSenderId: "889545344068",
    appId: "1:889545344068:web:aad53220721aeb5d086811"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;