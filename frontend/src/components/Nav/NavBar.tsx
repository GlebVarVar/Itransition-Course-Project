import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


import { Link } from 'react-router-dom';

import { useContext, useState, useEffect } from 'react';


import { getIsUserAdminAPI } from '../../services/Admin';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { toggleTheme, toggleLanguage } from '@/store/slices';

import { useTranslation } from 'react-i18next'; // переводы

export const NavBar = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();


  const [id, setId] = useState('');

  const navigate = useNavigate();

  const goTo = (e, to) => {
    e.preventDefault();
    navigate(to);
  };

  const setUserLanguage = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru').then(() => {
      localStorage.setItem('language', i18n.language);
    });
  };

  // useEffect(() => {
  //   if (context) {
  //     getIsUserAdminAPI(context.email).then((res) => {
  //       setId(res.data.id);
  //     });
  //   }
  // }, []);

  const logoColor = theme == 'light' ? 'black' : 'white';

  return (
    <Navbar bg={theme} variant={theme} expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: 'none', color: logoColor }}>
            Itransition
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link onClick={(e) => goTo(e, '/')}>{t('mainpage')}</Nav.Link>
            {/*{context ? (*/}
            {/*  <Nav.Link onClick={(e) => goTo(e, '/createpost')}> {t('createPost')}</Nav.Link>*/}
            {/*) : (*/}
            {/*  ''*/}
            {/*)}*/}

            <NavDropdown title={t('dropdown')} id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => setUserLanguage()}>
                {t('languageDropdown')}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => dispatch(toggleTheme())}>
                {theme == 'light' ? t('themeDarkDropdown') : t('themeLightDropdown')}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={(e) => goTo(e, '/adminpage')}>
                {t('adminPageDropdown')}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="justify-content-">
            <FormControl
              type="search"
              placeholder={t('search')}
              className="me-2"
              aria-label="Search"
            />
          </Form>

          <Nav.Link
            onClick={(e) => {
              goTo(e, `/profile/${id}`);
            }}>
            {context?.email}
          </Nav.Link>
          {context ? (
            <Button
              variant="outline-danger"
              onClick={(e) => {
                logout(e);
              }}>
              {t('logout')}
            </Button>
          ) : (
            <Button variant="outline-success" onClick={(e) => goTo(e, '/login')}>
              {t('login')}
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
