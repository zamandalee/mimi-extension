import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { resetCounter } from "./utils/functions";


const domains = [] // TODO: fetch domains from backend!!

ReactDOM.render(
  <App
    domains={domains}
    changePassword={domain => resetCounter(domain)} />,
  document.getElementById('root')
);

