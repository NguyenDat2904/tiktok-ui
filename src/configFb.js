import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';

const app = initializeApp(
    {
        apiKey: 'AIzaSyCqxshiw3Op2BB5-SIeuStqBFWgO58438s',
        authDomain: 'tiktok-facebook-b8f89.firebaseapp.com',
        projectId: 'tiktok-facebook-b8f89',
        storageBucket: 'tiktok-facebook-b8f89.appspot.com',
        messagingSenderId: '142644034565',
        appId: '1:142644034565:web:a592018aedf0e0ce41f06c',
        measurementId: 'G-H6GRB4RTX8',
    },
    'AUTH_TOKEN',
);
const auth_fb = getAuth(app);
const providerFaceBook = new FacebookAuthProvider();
export { auth_fb, providerFaceBook };
