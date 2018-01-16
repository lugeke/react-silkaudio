import { AUDIO_PLAY } from '../actions';

const playIdReducer = (state = '0', action) => {
  if (action.type === AUDIO_PLAY) {
    return action.id;
  } else {
    return state;
  }
};

export default playIdReducer;
