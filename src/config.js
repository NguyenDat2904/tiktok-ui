import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyCgeEtN96MhPOnwUpi179usayhcrwgpD_o',
    authDomain: 'tiktok-auth-ddb98.firebaseapp.com',
    projectId: 'tiktok-auth-ddb98',
    storageBucket: 'tiktok-auth-ddb98.appspot.com',
    messagingSenderId: '233131980808',
    appId: '1:233131980808:web:18cd685445656afa48f9bd',
    measurementId: 'G-PT8L9D9NGX',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const privider = new GoogleAuthProvider();

export { auth, privider };
