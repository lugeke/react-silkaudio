import {
  ADD_RECENT_LISTEN, PLAY_AUDIO,
  ON_AUDIO_END, ON_AUDIO_PAUSE, SAVE_PROGRESS,
} from '../actions';

const recentListenReducer = (state = {
  byIds: [],
  allIds: {},
}, action) => {
  switch (action.type) {
    case PLAY_AUDIO: {
      const index = state.byIds.indexOf(action.id);
      if (index === -1) {
        // not found id
        return {
          byIds: [ action.id, ...state.byIds ],
          allIds: {
            ...state.allIds,
            [action.id]: {
              audiobookId: action.id,
              progress: 0,
            },
          },
        };
      } else {
        // id move to first
        const byIds = state.byIds.slice();
        byIds.splice(index, 1);
        return {
          ...state,
          byIds: [ action.id, ...byIds ],
        };
      }
    }
    case ON_AUDIO_PAUSE:
    case SAVE_PROGRESS:
    case ON_AUDIO_END: {
      return {
        ...state,
        allIds: {
          ...state.allIds,
          [action.id]: {
            audiobookId: action.id,
            progress: action.progress,
            time: Date.now(),
          },
        },
      };
    }
    case ADD_RECENT_LISTEN: {
      return action.recentListen;
    }
    default: {
      return state;
    }
  }
};

export default recentListenReducer;
