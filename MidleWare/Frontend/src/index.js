import React from 'react';
import { createRoot } from 'react-dom/client'; // Thay đổi đường dẫn import ở đây
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Admin from './components/admin';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Employee from './components/employee';

const root = createRoot(document.getElementById('root')); // Sử dụng createRoot từ react-dom/client
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
