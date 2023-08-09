import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import {
  CreatePost,
  Profile,
  AdminPage,
  Login,
  Page404,
  Registration,
  MainPage,
  Post,
} from '@/components/pages';

import '@/shared/styles/App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

import { useSelector, useDispatch } from 'react-redux';
import { logIn, logOut } from '@/store';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = localStorage.getItem('language');
    currentLanguage && i18n.changeLanguage(currentLanguage);
  }, []);

  // if (loading) {
  //   return (
  //     <div className="App">
  //       <div className="spinner">
  //         <Spinner animation="border" role="status">
  //           <span className="visually-hidden">Loading...</span>
  //         </Spinner>
  //       </div>
  //     </div>
  //   );

  // } else {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/posts/:postId" element={<Post />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/edit/:postId" element={<AdminPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Router>
  );
  // }
};

export default App;
