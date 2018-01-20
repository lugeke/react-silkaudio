import { PLAY_AUDIO, PAUSE_AUDIO, ON_AUDIO_PLAY, ON_AUDIO_PAUSE } from '../actions';

const playStatusReducer = (state = {
  playId: 0,
  pause: true,
}, action) => {
  switch (action.type) {
    case PLAY_AUDIO:
    case PAUSE_AUDIO: {
      return {
        playId: action.id,
        pause: action.pause,
      };
    }
    case ON_AUDIO_PLAY: {
      return {
        playId: action.id,
        pause: false,
      };
    }
    case ON_AUDIO_PAUSE: {
      return {
        playId: action.id,
        pause: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default playStatusReducer;
