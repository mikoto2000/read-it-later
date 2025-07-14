import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  type User,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ROOT_DOCUMENT_NAME = 'read-it-later';
const BOOKMARKS_DOCUMENT_NAME = 'bookmarks';

let currentUser: User | null = null;

onAuthStateChanged(auth, (user: User | null) => {
  if (user) {
    console.log("ログイン済み");
    currentUser = user;
    updateProfile();
    if (currentUser) {
      fetchBookmarks(currentUser);
    }
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
  if (currentUser) {
    fetchBookmarks(currentUser);
  }
}

async function updateProfile() {
  // ログインユーザーの情報を #profile へ出力
  const profileElm = document.getElementById('profile');
  if (profileElm && currentUser) {
    profileElm.innerHTML = `ユーザー: ${currentUser.displayName}`;
  }
}

async function fetchBookmarks(user: User) {

  console.log(user.uid);
  const bookmarksRef = collection(db, ROOT_DOCUMENT_NAME, user.uid, BOOKMARKS_DOCUMENT_NAME);
  const docs = await getDocs(bookmarksRef);

  docs.forEach(doc => {
    console.log(doc.id, doc.data());
  });
}

document.addEventListener('DOMContentLoaded', () => {

});

