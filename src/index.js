import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { resetCounter } from "./utils/functions";
import { deleteDomain } from "./utils/firestore";

const domains = [] // TODO: fetch domains from backend!!

ReactDOM.render(
  <App
    domains={domains}
    changePassword={domain => resetCounter(domain)}
    deleteDomain={(uid, domain) => deleteDomain(uid, domain)} />,
  document.getElementById('root')
);

