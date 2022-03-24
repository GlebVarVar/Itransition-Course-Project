import { useState, useEffect } from "react";
import {auth, login, logout, register, googleLogin} from '../../services/firebase'
import { useNavigate } from "react-router-dom";
import NavBar from "../Nav/NavBar";


import {userContext} from "../Contexts/Contexts";
import axios from "axios";
import { useContext } from "react";

import { getAuth, onAuthStateChanged } from "firebase/auth";

const Registration = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [username, setUsername] = useState('');

  const context = useContext(userContext);

  const [errorReg, setErrorReg] = useState({
    errorMessage: '',
    error: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (context) navigate("/"); 
    return;
  }, [context]);


  const regFirebase = async () => {
    const responce = await register(auth, registerEmail, registerPassword);
    if (responce) {
      setErrorReg({
        errorMessage: responce.error.code,
        error: true
      });
    } else {
      setErrorReg({
        ...errorReg,
        error: false
      });
      console.log(context);
      
      
      
      await axios.post("http://localhost:3001/api/registration", {email: registerEmail, username: username })
      navigate('/');
      
      
    }
    console.log(responce);
  }


  return (
    <div>
      <NavBar/>
      <h3> Register User </h3>
      <input value={username}  onChange={(e) => setUsername(e.target.value)} placeholder="username"/>
      <input
        placeholder="Email..."
        value={registerEmail}
        onChange={(event) => {
          setRegisterEmail(event.target.value);
        }}
      />
      <input
      value={registerPassword}
        placeholder="Password..."
        onChange={(event) => {
          setRegisterPassword(event.target.value);
        }}
      />
      {
        errorReg.error ? <div>{errorReg.errorMessage} </div> : ""
      }

      <button onClick={regFirebase}> Create User</button>
    </div>
  )
}

export default Registration