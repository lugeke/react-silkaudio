import { SAVE_PROGRESS, ON_AUDIO_PAUSE, ON_AUDIO_END } from '../actions';
import { updateHistory } from '../utils';

const saveRecentListen = store => next => action => {
  switch (action.type) {
    case ON_AUDIO_PAUSE:
    case ON_AUDIO_END:
    case SAVE_PROGRESS: {
      const { user } = store.getState();
      if (user.isAuthenticated) {
        updateHistory({
          audiobook: action.id,
          progress: action.progress,
        }, user.token);
      }
      break;
    }
    default:
  }
  return next(action);
};

export default saveRecentListen;
