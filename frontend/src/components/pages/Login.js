import { useState, useEffect, useContext } from "react";
import {userContext, languageContext} from '../Contexts/Contexts';
import {auth, login, googleLogin} from '../../services/firebase'
import { useNavigate, Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";
import NavBar from "../Nav/NavBar";


import './Style/Login.css'


function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorLogin, setErrorLogin] = useState({
    errorMessage: '',
    error: false
  });

  const navigate = useNavigate();

  const {language} = useContext(languageContext);
  console.log(language)
  const context = useContext(userContext);  
  
  useEffect(() => {
    if (context) navigate(-1); 
    return;
  }, [context]);



  const loginFirebase = async () => {
    const responce = await login(auth, loginEmail, loginPassword);
    if (responce) {
      // Error handling in Russian

      // switch (responce.error.code.slice(5)) {
      //   case 'wrong-password':
      //     setErrorLogin({
      //       errorMessage: language.errorLoginPassword
      //     });
      //     console.log(errorLogin.errorMessage);
      //     break;
      //   case 'invalid-email':
      //     setErrorLogin({
      //       errorMessage: language.errorLogin
      //     });
      //     break;
      //   case 'user-not-found':
      //     setErrorLogin({
      //       errorMessage: language.userNotFound
      //     });
      //     break;
      //   case 'too-many-requests':
      //     setErrorLogin({
      //       errorMessage: language.errorManyRequests
      //     });
      //     console.log(errorLogin.errorMessage);
      //     console.log(language.errorManyRequests);
      //     break;
      //   default:
      //     setErrorLogin({
      //       errorMessage: responce.error.code
      //     });
      //     break;
      // }
      
      setErrorLogin({
        ...errorLogin,
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
    console.log(errorLogin)
    console.log(responce.error);
  }


  return (
    <>
      <NavBar/>
      <div className="d-flex align-items-center justify-content-center" style={{height: '500px'}}>
        
       <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>
              {language.email}
            </Form.Label>
            <Form.Control type="email" placeholder={language.enterEmail} onChange={(e) => setLoginEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              {language.privacy}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>
              {language.password}
            </Form.Label>
            <Form.Control type="password" placeholder={language.password} onChange={(e) => setLoginPassword(e.target.value)}/>
            {
              errorLogin.error ? 
              <Form.Text style={{ color: "red" }}>
                {errorLogin.errorMessage}
              </Form.Text> : ""
            }
          </Form.Group >


          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Button variant="primary" onClick={loginFirebase}>
                  {language.login}
                </Button>
              </Col>
              <Col>
                <Button variant="primary"  onClick={() => googleLogin(auth)}>
                {language.loginGoogle} 
                </Button>
              </Col>
            </Row>
            </Form.Group >



            <Form.Group className="mb-3">
              <Button>
                <Link style={{color: 'white'}} to="/registration">{language.signup}</Link>
              </Button>
            </Form.Group>
          
          
            

        </Form>
      </div>
      
    </>
  );
}

export default App;