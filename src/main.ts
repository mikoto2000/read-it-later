import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  onAuthStateChanged,
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

onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    console.log("ログイン済み");
    currentUser = user;
    updateProfile();
  } else {
    console.log("未ログイン");
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
      loginButton.addEventListener('click', login);
      loginButton.style.display = '';
    }
  }
});

async function login() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  currentUser = result.user;
  updateProfile();
}

async function updateProfile() {
  // ログインユーザーの情報を #profile へ出力
  const profileElm = document.getElementById('profile');
  if (profileElm && currentUser) {
    profileElm.innerHTML = `ユーザー: ${currentUser.displayName}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {

});

