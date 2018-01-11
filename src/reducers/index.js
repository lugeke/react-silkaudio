import { combineReducers } from 'redux';
import playIdReducer from './playIdReducer';
import historiesReducer from './historiesReducer';

const reducer = combineReducers({
  playId: playIdReducer,
  histories: historiesReducer,
});

export default reducer;
