
import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Signup = ({ switchToLogin }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate =  useNavigate();
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }
    axios.post('http://localhost:5000/register', 
      { name, email, password }, 
      { headers: { 'Content-Type': 'application/json' } }
    )
    .then(result => {
      console.log(result)
      switchToLogin();
    })
    .catch(err => console.log(err));
  }    
  

  return (
    
    <div className='sign-body'> 
      <div className="form-box regi">
      <h2 className="animation" style={{ '--li': 17, '--S': 0 }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-box animation" style={{ '--li': 18, '--S': 1 }}>
          <input type="text" required onChange={(e) => setName(e.target.value)} />
          <label>Username</label>
          <i className='bx bxs-user'></i>
        </div>
        <div className="input-box animation" style={{ '--li': 19, '--S': 2 }}>
          <input type="email" required onChange={(e) => setEmail(e.target.value)} />
          <label>Email</label>
          <i className='bx bx-envelope'></i>
        </div>
        <div className="input-box animation" style={{ '--li': 20, '--S': 3 }}>
          <input type="password" required onChange={(e) => setPassword(e.target.value)} />
          <label>Password</label>
          <i className='bx bx-lock-alt'></i>
        </div>
        <div className="input-box animation" style={{ '--li': 21, '--S': 4 }}>
          <button className="btn" type="submit">Register</button>
        </div>
        <div className="reg-link animation" style={{ '--li': 22, '--S': 5 }}>
          <p>Already have an account? <a href="#" onClick={switchToLogin} className="SignInLink">Login</a></p>
        </div>
      </form>
    </div>
      
    </div>
  );
};

export default Signup;

