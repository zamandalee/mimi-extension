import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { resetCounter } from "./utils/functions";
import { deleteDomain } from "./utils/firestore";

const domains = [
  'instacart.com', 'airbnb.com', 'robinhood.com', 'nytimes.com', 'canva.com', 'lyft.com',
  'twitter.com', 'brown.edu', 'workday.com', 'apple.com'
] // TODO: fetch domains from backend!!

ReactDOM.render(
  <App
    domains={domains}
    changePassword={domain => resetCounter(domain)}
    deleteDomain={(uid, domain) => deleteDomain(uid, domain)} />,
  document.getElementById('root')
);

