import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Initialize Firebase
var config = {
        apiKey: "AIzaSyCuot23WfinWINPPXqkgq-nVUcW6cc0ypA",
        authDomain: "admintools-345c0.firebaseapp.com",
        databaseURL: "https://admintools-345c0.firebaseio.com",
        projectId: "admintools-345c0",
        storageBucket: "admintools-345c0.appspot.com",
        messagingSenderId: "8982901183",
        appId: "1:8982901183:web:948ddec4fb6f1294"
};
firebase.initializeApp(config);

const storage = firebase.storage();
const db = firebase.firestore();

export {
    db, storage, firebase as default
}
