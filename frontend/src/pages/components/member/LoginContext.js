import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './LoginForm';
import './Member.css';

const LoginContext = (
  {
  activeIndex,
  handleManagerClick,
  handleExternalWorkerClick,
  email,
  password,
  setEmail,
  setPassword,
  handleLogin,
  emailErr,
  passwordErr,
  err,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModal2, setIsOpenModal2] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const openModal2 = () => {
    setIsOpenModal2(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const closeModal2 = () => {
    setIsOpenModal2(false);
  };

  return (
    <div className="context">
      <div className="login-logo">
        <span className="login-logo-text">Weather Project</span>
      </div>
      <LoginForm
        activeIndex={activeIndex}
        handleManagerClick={handleManagerClick}
        handleExternalWorkerClick={handleExternalWorkerClick}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        handleLogin={handleLogin}
        emailErr={emailErr}
        passwordErr={passwordErr}
        err={err}
      />
      <Link to={"/signup"} className='signup-link'>회원가입</Link>
    </div>
  );
};

export default LoginContext;