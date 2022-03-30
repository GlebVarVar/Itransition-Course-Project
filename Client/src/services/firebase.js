import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { _apiBase } from ".";

const firebaseConfig = {
 // your config
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
    
    await axios.post(`${_apiBase}/users/registration`, {email: result.user.email, username: result.user.displayName })
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
