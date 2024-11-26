import React from 'react';
function GoogleLoginButton({onClick,isLoggedIn}) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded">
      {isLoggedIn?"Logout":"Login"}
    </button>
  );
}

export default GoogleLoginButton;
