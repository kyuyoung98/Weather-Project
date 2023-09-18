import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Main.module.css';

const Main = () => {
  return (
    <div className={classes.header}>
        <h1>Welcome to our weather website</h1>
    </div>
  );
}

export default Main;