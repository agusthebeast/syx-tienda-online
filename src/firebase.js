import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig = {
 apiKey: 'AIzaSyBgArCN1FMSnUVqSXXJ--EULOwtKz4PqTU',
 authDomain: 'tiendasyxonline.firebaseapp.com',
 projectId: 'tiendasyxonline',
 storageBucket: 'tiendasyxonline.firebasestorage.app',
 messagingSenderId: '952715724898',
 appId: '1:952715724898:web:f53d351fa88601e2b2e93b'
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
