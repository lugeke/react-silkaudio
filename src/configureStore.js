import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import idbKeyval from 'idb-keyval';

import reducer from './reducers';


const configureStore = () => {
  const middleware = [ thunk ];
  if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
  }

  const store = createStore(
    reducer,
    applyMiddleware(...middleware),
  );


  store.subscribe(() => {
    idbKeyval.set('recentListen', store.getState().recentListen);
  });

  return store;
};

export default configureStore;
