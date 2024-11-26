import React, { useEffect } from 'react';
import '../styles/SplashPage.css';

const SplashPage = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById("splash-screen").style.display = "none";
      window.location.href = '/Home'; // Redirect to the home page
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='splash-html splash-body'>
      <div id="splash-screen">
        <div className="splash-container">
          <h1 className="logo-text">Socratic Learning</h1>
          <p className="quote">“I cannot teach anybody anything. I can only make them think.”</p>
        </div>
      </div>
      <div id="root"></div>
    </div>
  );
};

export default SplashPage;
