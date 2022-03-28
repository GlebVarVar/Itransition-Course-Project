import {Navbar, Container, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";


import { logout } from '../../services/firebase';

import { Link } from 'react-router-dom';


import { themeContext, userContext, languageContext } from '../Contexts/Contexts';
import { useContext } from 'react';

import { russianLanguage, englishLanguage } from '../Translation/Languages';

const NavBar = () => {

    const context = useContext(userContext) 
    const {theme, setTheme} = useContext(themeContext); 
    const {language, setLanguage} = useContext(languageContext); 


    const navigate = useNavigate();

    const goTo = (e, to) => {
        e.preventDefault();
        navigate(to);
    }


    const logoColor = theme == 'light'? 'black' : 'white' 

    const setUserLanguage = async () => {
        localStorage.setItem('language', language.language == 'english'? russianLanguage.language : englishLanguage.language);
        await setLanguage(language.language == 'english'? russianLanguage : englishLanguage );
        
    }

    return (
        <Navbar bg={theme} variant={theme} expand="lg">
            <Container fluid>
                <Navbar.Brand><Link to="/" style={{ textDecoration: 'none', color: logoColor }}>Itransition</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll>

                    <Nav.Link onClick={(e) => goTo(e, '/')}>{language.mainpage }</Nav.Link>
                    {
                    context? <Nav.Link onClick={(e) => goTo(e, '/createpost')}> {language.createPost}</Nav.Link> : ""
                    }

                    <NavDropdown title={language.dropdown} id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => setUserLanguage()}>{language.languageDropdown}</NavDropdown.Item>
                        <NavDropdown.Item onClick={() => setTheme(theme == 'light'? 'dark' : 'light' )}>{theme == 'light'? language.themeDarkDropdown : language.themeLightDropdown}</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={(e) => goTo(e, '/adminpage')}>{language.adminPageDropdown}</NavDropdown.Item>
                    </NavDropdown>
                    
                </Nav>
                <Form className="justify-content-">
                    <FormControl
                    type="search"
                    placeholder={language.search}
                    className="me-2"
                    aria-label="Search"
                    />
                        
                </Form>
                
                <Nav.Link onClick={(e) => goTo(e, `/profile/${context.uid}`)} > {context?.email}</Nav.Link>
                {
                    context? <Button variant="outline-danger" onClick={(e) => {
                        logout(e)
                    }} >{language.logout}</Button> : <Button variant="outline-success"  onClick={(e) => goTo(e, '/login')} >{language.login}</Button>
                }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


export default NavBar