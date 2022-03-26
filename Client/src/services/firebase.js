import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyAkQcVhlydWtlMOqF0JTN2FDDNBbD2XizI",
  authDomain: "first-project-1c025.firebaseapp.com",
  databaseURL: "https://first-project-1c025-default-rtdb.firebaseio.com",
  projectId: "first-project-1c025",
  storageBucket: "first-project-1c025.appspot.com",
  messagingSenderId: "783209274400",
  appId: "1:783209274400:web:3e4d29500fc5f5b3923045"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const nav = () => {
  const navigate = useNavigate();
  navigate(-1);
}


const register = async (auth, registerEmail, registerPassword) => {
  try {
    const user = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );
    // console.log(user.currentUser.uid);
  } catch (error) {
    return {error}
  }
};

const login = async (auth, loginEmail, loginPassword) => {
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(result.user);
    // console.log(auth);
  } catch (error) {
    return {error}
  }
};

const googleLogin = async (auth) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    
    await axios.post("http://localhost:3001/api/users/registration", {email: result.user.email, username: result.user.displayName })
    console.log(result.user);
  } catch (error) {
    return error.message
  }
  
}

const logout = async (e) => {
  e.preventDefault();
  await signOut(auth);
};




export {auth, login, logout, register, googleLogin}