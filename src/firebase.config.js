// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBPY4ANWtZG48_BPN4k49mv2NtA851jYuU',
  authDomain: 'upfor-real-estate-marketplace.firebaseapp.com',
  projectId: 'upfor-real-estate-marketplace',
  storageBucket: 'upfor-real-estate-marketplace.appspot.com',
  messagingSenderId: '1014157276046',
  appId: '1:1014157276046:web:eacd30a2a7c46a359faadf',
  measurementId: 'G-G0CC98WWGG'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore()
