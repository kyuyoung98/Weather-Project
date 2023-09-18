import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css'; // CSS 파일을 추가

import CreateAccountForm from './components/Auth/CreateAccountForm';
import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import CreateAccountPage from './pages/CreateAccountPage';
import ProfilePage from './pages/ProfilePage';
import AuthContext from './store/auth-context';
import MainPage from './pages/MainPage';

function App() {

  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/main/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <MainPage />} />
        <Route path="/signup/" element={authCtx.isLoggedIn ? <Navigate to='/' /> : <CreateAccountPage />} />
        <Route path="/login/*" 
          element={authCtx.isLoggedIn ? <Navigate to='/main/' /> : <AuthPage />}
        />
        <Route path="/profile/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <ProfilePage />} />
        <Route path="/main/" element={!authCtx.isLoggedIn ? <Navigate to='/' /> : <MainPage />} />
      </Routes>
    </Layout>
  );
}

export default App;