import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { getCounter } from "./utils/functions";


const domains = [] // TODO: fetch domains from backend!!

ReactDOM.render(
  <App
    domains={domains}
    changePassword={domain => getCounter(domain, true)} />,
  document.getElementById('root')
);

