import { useState, FC } from 'react';
import { auth, login, googleLogin } from '../../services/firebase';
import { useNavigate, Link } from 'react-router-dom';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { Layout } from '../Layout/main';

import { useTranslation } from 'react-i18next';

export const Login: FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState({
    errorMessage: '',
    error: false,
  });

  const navigate = useNavigate();


  const { t } = useTranslation();

  // useEffect(() => {
  //   if (context) navigate(-1);
  //   return;
  // }, [context]);

  const loginFirebase = async () => {
    const responce = await login(auth, loginEmail, loginPassword);
    if (responce) {
      // Error handling in Russian

      // switch (responce.error.code.slice(5)) {
      //   case 'wrong-password':
      //     setErrorLogin({
      //       errorMessage: t("errorLoginPassword
      //     });
      //     break;
      //   case 'invalid-email':
      //     setErrorLogin({
      //       errorMessage: t("errorLogin
      //     });
      //     break;
      //   case 'user-not-found':
      //     setErrorLogin({
      //       errorMessage: t("userNotFound
      //     });
      //     break;
      //   case 'too-many-requests':
      //     setErrorLogin({
      //       errorMessage: t("errorManyRequests
      //     });
      //     break;
      //   default:
      //     setErrorLogin({
      //       errorMessage: responce.error.code
      //     });
      //     break;
      // }

      setErrorLogin({
        ...errorLogin,
        error: true,
      });
    } else {
      setErrorLogin({
        ...errorLogin,
        error: false,
      });
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
        <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{t('email')}</Form.Label>
            <Form.Control
              type="email"
              placeholder={t('enterEmail')}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <Form.Text className="text-muted">{t('privacy')}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>{t('password')}</Form.Label>
            <Form.Control
              type="password"
              placeholder={t('password')}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            {errorLogin.error ? (
              <Form.Text style={{ color: 'red' }}>{errorLogin.errorMessage}</Form.Text>
            ) : (
              ''
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Button variant="primary" onClick={loginFirebase}>
                  {t('login')}
                </Button>
              </Col>
              <Col>
                <Button variant="primary" onClick={() => googleLogin(auth)}>
                  {t('loginGoogle')}
                </Button>
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Button>
              <Link style={{ color: 'white' }} to="/registration">
                {t('signup')}
              </Link>
            </Button>
          </Form.Group>
        </Form>
      </div>
    </Layout>
  );
};
