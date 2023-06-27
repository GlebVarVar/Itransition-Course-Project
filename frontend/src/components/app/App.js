 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Page404 from '../pages/Page404';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import MainPage from '../pages/MainPage';
import Post from '../pages/Post';
import CreatePost from '../pages/CreatePost';
import Profile from '../pages/Profile';
import AdminPage from '../pages/AdminPage';
import ResetPassword from '../pages/ResetPassword';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase"; 
import { useState } from "react";
import { Spinner } from "react-bootstrap";

import {userContext, themeContext, languageContext} from "../Contexts/Contexts";

import { englishLanguage, russianLanguage } from "../Translation/Languages";

function App() {
  const [user, loading, error] = useAuthState(auth);

  const localStorageLanguage = localStorage.getItem('language') == 'english' ? englishLanguage : localStorage.getItem('language') != 'russian'? englishLanguage: russianLanguage;

  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(localStorageLanguage);
  


  if (loading) {
    return (
      <div className="App" >
        <div className="spinner">
          <Spinner  animation="border" role="status" >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div> 
    )
  } else {
    return (
      <userContext.Provider value={user}>
      <themeContext.Provider value={{theme, setTheme}}>
      <languageContext.Provider value={{language, setLanguage}}>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/registration" element={<Registration/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/profile/:profileId" element={<Profile/>}/>
              <Route path="/posts/:postId" element={<Post/>}/>
              <Route path="/createpost" element={<CreatePost/>}/>
              <Route path="/profile/resetpassword" element={<ResetPassword/>}/>
              <Route path="/adminpage" element={<AdminPage/>}/>
              <Route path="/edit/:postId" element={<AdminPage/>}/>
              <Route path="*" element={<Page404/>}/>
            </Routes>
          </Router>
      </languageContext.Provider>
      </themeContext.Provider> 
      </userContext.Provider>
    )
  }
  
}

export default App;
