import {
  PLAY_AUDIO,
  ON_AUDIO_END, ON_AUDIO_PAUSE, SAVE_PROGRESS, RECENT_SUCCESS,
} from '../actions';

function normalize(histories) {
  const byIds = histories.map(h => h.audiobook);
  const allIds = histories.reduce((acc, cur) => {
    acc[cur.audiobook] = cur;
    return acc;
  }, {});
  return { byIds, allIds };
}

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
    case RECENT_SUCCESS: {
      return normalize(action.data.results);
    }
    default: {
      return state;
    }
  }
};

export default recentListenReducer;
