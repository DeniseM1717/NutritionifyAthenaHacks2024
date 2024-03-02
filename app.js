import React from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import './token.js';


document.querySelector('#root');
const root = createRoot(document.querySelector('#root'));
root.render(
  <React.StrictMode>
    <div id="main">
      <div className="container">
        <div id="header">
          <h1></h1>

        </div>

        <Store />
      </div>
    </div>
    <div id="footer">
      <p></p>
    </div>
  </React.StrictMode>
);
