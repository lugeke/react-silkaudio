import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import logo from './logo.svg';

const loggerMiddleware = createLogger();

function getState() {
  let histories = localStorage.getItem('histories');
  if (histories) {
    histories = JSON.parse(histories);
    console.log(histories);
    histories = histories.sort((a, b) => b.recentListen - a.recentListen);
    return {
      histories,
    };
  }
  return undefined;
}
const store = createStore(reducer, applyMiddleware(
  thunkMiddleware,
  loggerMiddleware,
));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
