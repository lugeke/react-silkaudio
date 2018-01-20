import { combineReducers } from 'redux';
import playStatusReducer from './playStatusReducer';
import audiobooksReducer from './audiobooksReducer';
import recentListenReducer from './recentListenReducer';

const reducer = combineReducers({
  playStatus: playStatusReducer,
  audiobooks: audiobooksReducer,
  recentListen: recentListenReducer,
});

export default reducer;
