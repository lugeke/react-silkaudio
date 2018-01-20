import {
  FETCH_AUDIOBOOKS,
} from '../actions';

const audiobooksReducer = (state = {
  byIds: [],
  allIds: {},
}, action) => {
  switch (action.type) {
    case FETCH_AUDIOBOOKS: {
      const byIds = action.audiobooks.map(a => a.id);
      return {
        byIds,
        allIds: action.audiobooks,
      };
    }
    default: {
      return state;
    }
  }
};

export default audiobooksReducer;
