import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for createRoot
import Approute from './components/Approute'; // Your routing component

console.log("I am here");

// Create a root and render your app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Approute />);
