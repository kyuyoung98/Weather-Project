import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import classes from './CreateAccountForm.module.css';

const CreateAccountForm = () => {

  let navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    const enteredName = nameInputRef.current!.value;
    const enteredPhone = phoneInputRef.current!.value;
    const enteredAddress = addressInputRef.current!.value;

    authCtx.signup(enteredEmail, enteredPassword, enteredName, enteredPhone, enteredAddress);
    
    if (authCtx.isSuccess) {
      return navigate("/", { replace: true });
      
    }
    
  }

  return (
    <section className={classes.auth}>
      <h1>Create Account</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type='text' id='name' required ref={nameInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Phone</label>
          <input type='text' id='phone' required ref={phoneInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">Address</label>
          <input type='text' id='address' required ref={addressInputRef}/>
        </div>
        <div className={classes.actions}>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </section>
  );
};

export default CreateAccountForm;