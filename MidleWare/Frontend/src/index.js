import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Admin from './components/admin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Employee from './components/employee';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
,'/');

// root.render(
//   <React.StrictMode>
//     <Employee />
//   </React.StrictMode>
// ,'/employee');

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
