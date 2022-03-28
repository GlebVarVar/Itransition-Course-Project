import { useState, useEffect, useContext } from "react";
import {userContext, languageContext} from "../Contexts/Contexts";
import {auth, register} from '../../services/firebase'
import { useNavigate } from "react-router-dom";

import NavBar from "../Nav/NavBar";
import { Form, Row, Col, Button } from "react-bootstrap";

import { postRegistraionAPI } from "../../services/Users";

const Registration = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [username, setUsername] = useState('');
  const [errorReg, setErrorReg] = useState({
    errorMessage: '',
    error: false
  });

  const context = useContext(userContext);
  const {language} = useContext(languageContext)

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

      await postRegistraionAPI(registerEmail, username)
      navigate('/');
    }
  }


  return (
    <div>
      <NavBar/>

      <div className="d-flex align-items-center justify-content-center" style={{height: '500px'}}>
        
       <Form className="rounded p-4 p-sm-3">

          <Form.Group className="mb-3" >
            <Form.Label>{language.username}</Form.Label>
            <Form.Control type="email" placeholder={language.enterUsername} onChange={(e) => setUsername(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{language.email}</Form.Label>
            <Form.Control type="email" placeholder={language.enterEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
            <Form.Text className="text-muted">
              {language.privacy}
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{language.password}</Form.Label>
            <Form.Control type="password" placeholder={language.password} onChange={(e) => setRegisterPassword(e.target.value)}/>

            {
              errorReg.error ? 
              <Form.Text style={{ color: "red" }}>
                {errorReg.errorMessage}
              </Form.Text> : ""
            }
          </Form.Group >


          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Button variant="primary" onClick={regFirebase}>
                  {language.signup}
                </Button>
              </Col>
            </Row>
            </Form.Group >
        </Form>
      </div>
    </div>
  )
}

export default Registration