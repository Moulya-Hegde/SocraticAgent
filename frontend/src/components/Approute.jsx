import {useState} from 'react'
import Signup from './Signup'
import Login from './Login'
import LoginApp from './LoginApp'
import App from "./App"
import Splash from './Splash'; 

import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
function Approute() {
    return( 
    <BrowserRouter>
     <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/Register" element={<Signup />} />
        <Route path="/Login" element={<LoginApp />} />
        <Route path="/Home" element={<App />} />
     </Routes>
    </BrowserRouter>)
}
export default Approute;