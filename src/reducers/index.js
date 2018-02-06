import { combineReducers } from 'redux';
import playStatusReducer from './playStatusReducer';
import audiobooksReducer from './audiobooksReducer';
import recentListenReducer from './recentListenReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
  playStatus: playStatusReducer,
  audiobooks: audiobooksReducer,
  recentListen: recentListenReducer,
  user: userReducer,
});

export default reducer;
