import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "meesho-design-studio-mvp",
  storageBucket: "meesho-design-studio-mvp.appspot.com",
  messagingSenderId: "1075568988546",
  appId: "1:1075568988546:web:bee83bbab1ed439487bf9b"
};

const app = initializeApp(firebaseConfig);

// ✅ Export auth for use in AuthContext
export const auth = getAuth(app);
export default app; 