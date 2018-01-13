import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './reducers';
import logo from './logo.svg';


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
const store = createStore(reducer, getState());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
