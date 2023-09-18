import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import AuthContext from '../../store/auth-context';


const MainNavigation = () =>{

  const authCtx = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  let isLogin = authCtx.isLoggedIn;
  let isGet = authCtx.isGetSuccess;

  const callback = (str:string) => {
    setNickname(str);
  }

  useEffect(() => {
    if (isLogin) {
      console.log('start');
      authCtx.getUser();
    } 
  }, [isLogin]);

  useEffect(() => {
    if (isGet) {
      console.log('get start');
      callback(authCtx.userObj.name);
    }
  }, [isGet]);


  const toggleLogoutHandler = () => {
    authCtx.logout();
  }

  
  return(
    <header className={classes.header}>
      <nav className={classes.nav}>
        <p className={classes.logo}>
          {!isLogin && <Link to='/'>Home</Link>}
          {isLogin && <Link to='/main/'>Main</Link>}
        </p>
        <ul className={classes.navList}>
          <li className={classes.navItem}>{!isLogin && <Link to='/login'>Login</Link>}</li>
          <li className={classes.navItem}>{!isLogin && <Link to='/signup'>Sign-Up</Link>}</li>
          <li className={classes.navItem}>{isLogin && <Link to='/profile'>{nickname}</Link>}</li>
          <li className={classes.navItem}>{isLogin && <button onClick={toggleLogoutHandler}>Logout</button>}</li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;