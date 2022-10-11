import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';

function App() {
  return (
    <Router>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/login'>Login</Link></li>
    </ul>
  </Router>
  );
}

export default App;
