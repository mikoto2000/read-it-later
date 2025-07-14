import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);

// app の情報を #app へ出力
const appElm = document.getElementById('app');
if (appElm) {
  appElm.innerHTML = JSON.stringify(app);
}

const auth = getAuth(app);

let currentUser: User | null = null;

async function login() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  currentUser = result.user;

  // uid の情報を #uid へ出力
  const profileElm = document.getElementById('profile');
  if (profileElm) {
    profileElm.innerHTML = `ユーザー: ${currentUser.displayName}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');

  document.getElementById('login-button').addEventListener('click', login);
});

