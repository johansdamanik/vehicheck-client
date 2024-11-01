// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDkmzg1nXbEgk5v5QfsoXgdhLpjF4A7wsE',
  authDomain: 'vehicheck-id.firebaseapp.com',
  projectId: 'vehicheck-id',
  storageBucket: 'vehicheck-id.appspot.com',
  messagingSenderId: '332964264570',
  appId: '1:332964264570:web:dd6fb9f05e50dcd83ad9c3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
