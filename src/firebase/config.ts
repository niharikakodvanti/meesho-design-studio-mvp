import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDdHMBpX5z9NLDXHxhb5A1eE3XVHbxnegE",
  authDomain: "meesho-design-studio-mvp.firebaseapp.com",
  projectId: "meesho-design-studio-mvp",
  storageBucket: "meesho-design-studio-mvp.firebasestorage.app",
  messagingSenderId: "1075568988546",
  appId: "1:1075568988546:web:bee83bbab1ed439487bf9b"
};

const app = initializeApp(firebaseConfig);
export default app; 