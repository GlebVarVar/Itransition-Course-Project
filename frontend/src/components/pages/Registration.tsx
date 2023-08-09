import { useState, useEffect } from 'react';
import { auth, register } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

import { NavBar } from '@/components/Nav';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { postRegistraionAPI } from '../../services/Users';





import { useTranslation } from 'react-i18next';
import {SubmitHandler, useForm} from "react-hook-form";

import {useDispatch} from "react-redux";

interface RegistrationForm {
    username: string;
    email: string;
    password: string;
}

export const Registration = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorReg, setErrorReg] = useState({
    errorMessage: '',
    error: false,
  });


  const dispatch = useDispatch();


  const { register, handleSubmit, watch, formState: { errors }} = useForm<RegistrationForm>()
    console.log(watch("email"));
  const onSubmit: SubmitHandler<RegistrationForm> = data => console.log(data);
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (context) navigate('/');
    return;
  }, [context]);

  const regFirebase = async () => {
    const responce = await register(auth, registerEmail, registerPassword);
    if (responce) {
      setErrorReg({
        errorMessage: responce.error.code,
        error: true,
      });
    } else {
      setErrorReg({
        ...errorReg,
        error: false,
      });

      await postRegistraionAPI(registerEmail, username);
      navigate('/');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
        <Form className="rounded p-4 p-sm-3" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>{t("username")}</Form.Label>
            <Form.Control
              {...register("username")}
              type="email"
              placeholder={t("enterUsername")}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t("email")}</Form.Label>
            <Form.Control
              {...register("email")}
              type="email"
              placeholder={t("enterEmail")}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <Form.Text className="text-muted">{t("privacy")}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
                {...register("password")}
              type="password"
              placeholder={t("password")}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />

            {errorReg.error ? (
              <Form.Text style={{ color: 'red' }}>{errorReg.errorMessage}</Form.Text>
            ) : (
              ''
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Control type="submit" >
                  {t("signup")}
                </Form.Control>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
  );
};
