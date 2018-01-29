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
      const allIds = action.audiobooks.reduce((acc, cur) => {
        acc[cur.id] = cur;
        return acc;
      }, {});
      return {
        byIds,
        allIds,
      };
    }
    default: {
      return state;
    }
  }
};

export default audiobooksReducer;
