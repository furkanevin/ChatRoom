// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAfV7HmR-zTHV3Lv-7dwIlKppmb6MTBJRc',
  authDomain: 'chatroom-66cd2.firebaseapp.com',
  projectId: 'chatroom-66cd2',
  storageBucket: 'chatroom-66cd2.appspot.com',
  messagingSenderId: '448833721765',
  appId: '1:448833721765:web:bf383eb8c3867f4611444c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
