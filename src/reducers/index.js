import { combineReducers } from 'redux';
import playIdReducer from './playIdReducer';
import audiobooksReducer from './audiobooksReducer';

const reducer = combineReducers({
  playId: playIdReducer,
  audiobooks: audiobooksReducer,
});

export default reducer;
