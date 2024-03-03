import React, { useState } from 'react';

import ReactDOM from 'react-dom/client';
import Login from './pages/Login.jsx';
import App from './App.jsx';
import Results from './pages/Results.jsx';
import {BrowserRouter as Router} from "react-router-dom";



import './pages/index.css'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

