import { combineReducers } from 'redux';
import playStatusReducer from './playStatusReducer';
import audiobooksReducer from './audiobooksReducer';
import recentListenReducer from './recentListenReducer';
import userReducer from './userReducer';
import registerReducer from './registerReducer';

const reducer = combineReducers({
  playStatus: playStatusReducer,
  audiobooks: audiobooksReducer,
  recentListen: recentListenReducer,
  user: userReducer,
  register: registerReducer,
});

export default reducer;
