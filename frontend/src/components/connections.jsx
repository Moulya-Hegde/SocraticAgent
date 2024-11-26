import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import App from './LoginApp'; // If Login is a separate component

function Connections() {
  return (
    <Router>
         <App/>
      <Routes>
    
       
        {/* Define the route for Login */}
        {/* <Route path="/" element={<Login />} /> */}
        {/* Define the route for Signup/Register */}
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
  );
}
export default Connections;