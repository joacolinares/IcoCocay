import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB1b7usRoXOdGQ3aVcDoh1MlzdLpWgxchg",
    authDomain: "aisolves.firebaseapp.com",
    projectId: "aisolves",
    storageBucket: "aisolves.appspot.com",
    messagingSenderId: "479595115133",
    appId: "1:479595115133:web:347313c99c5436b499b714"
}

const app = initializeApp(firebaseConfig)

export const authentication = getAuth(app)