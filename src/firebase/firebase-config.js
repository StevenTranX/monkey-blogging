import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyAkIJ20oSbKQKCkBXYFTkBZp-R8_gFNLC8',
  authDomain: 'monkey-blogging-89a2c.firebaseapp.com',
  projectId: 'monkey-blogging-89a2c',
  storageBucket: 'monkey-blogging-89a2c.appspot.com',
  messagingSenderId: '197970679397',
  appId: '1:197970679397:web:7199ff863ec9124589d88c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export database
export const db = getFirestore(app);
export const auth = getAuth(app);
