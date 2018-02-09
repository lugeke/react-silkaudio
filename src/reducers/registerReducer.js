import {
  REGISTER_REQUEST, REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../actions';

const defaultState = {
  isRegistering: false,
  isRegistered: false,
  error: undefined,
};

const registerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...defaultState,
        isRegistering: true,
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...defaultState,
        isRegistered: true,
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...defaultState,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
};

export default registerReducer;
