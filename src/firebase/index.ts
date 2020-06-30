import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import { firebaseConfig } from './config';

firebase.initializeApp(firebaseConfig);

export const createRef = (collection: string, docId: string) =>
  db.collection(collection).doc(docId);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const FirebaseTimestamp = firebase.firestore.Timestamp;
export const FirebaseFieldValue = firebase.firestore.FieldValue;

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
