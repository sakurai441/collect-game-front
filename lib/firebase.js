import 'firebase/compat/auth'
import firebase from 'firebase/compat/app'

const config = {
  apiKey: "AIzaSyBUh_8_vfFv20CuawkQc-zLDvoqF3nZ7ls",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()

export default auth
