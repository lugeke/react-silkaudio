import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import logo from './logo.svg';
import configureStore from './configureStore';
import Root from './components/Root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
registerServiceWorker();
