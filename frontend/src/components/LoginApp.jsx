import React, { useState } from 'react';
import Signup from './Signup';
import Login from './Login';
import '../styles/Signup.css';

const LoginApp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToSignUp = () => {
    setIsLogin(false);
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  return (
    <div className='sign-body'>
      <div className={`container ${!isLogin ? 'active' : ''}`}>
      <div className="curved-shape"></div>
      <div className="curved-shape2"></div>
      {isLogin ? (
        <Login switchToSignUp={switchToSignUp} />
      ) : (
        <Signup switchToLogin={switchToLogin} />
      )}
    </div>
    </div>
  );
};

export default LoginApp;

