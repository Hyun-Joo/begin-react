import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Hello from "./Hello";

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
    <Hello name="react" isSpecial />,
  document.getElementById('root')
);

