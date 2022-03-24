import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, login, logout,  googleLogin} from '../../services/firebase'
import { useNavigate, Link } from "react-router-dom";

import { Form, Button, Container } from "react-bootstrap";
import { useContext } from 'react';
import {userContext} from '../Contexts/Contexts';

import NavBar from "../Nav/NavBar";

import 'firebase/auth';

function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState({
    errorMessage: '',
    error: false
  });

  // const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();


  const context = useContext(userContext)  
  
  useEffect(() => {
    if (context) navigate(-1); 
    return;
  }, [context]);



  const loginFirebase = async () => {
    const responce = await login(auth, loginEmail, loginPassword);
    if (responce) {
      setErrorLogin({
        errorMessage: responce.error.code,
        error: true
      });
    } else {
      setErrorLogin({
        ...errorLogin,
        error: false
      });
      setLoginEmail('');
      setLoginPassword('');
    }
    console.log(responce);
  }


  return (
    <>
      <NavBar/>
      <Container>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setLoginEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => setLoginPassword(e.target.value)}/>
            {
              errorLogin.error ? 
              <Form.Text style={{ color: "red" }}>
                {errorLogin.errorMessage}
              </Form.Text> : ""
            }
          </Form.Group>
          
          <Container>
            <Button variant="primary" onClick={loginFirebase}>
              Login
            </Button>
            <Button variant="primary"  onClick={() => googleLogin(auth)}>
              Login with Google
            </Button>
            <Form.Text>
              <Link to="/registration">Sign up!</Link>
            </Form.Text>
          </Container>
        </Form>
      </Container>
    </>
    
  );
}

export default App;