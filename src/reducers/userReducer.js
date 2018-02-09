import {
  LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions';

const defaultState = {
  username: '',
  isAuthenticated: false,
  isAuthenticating: false,
  token: '',
  error: '',
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...defaultState,
        isAuthenticating: true,
      };
    }
    case LOGIN_SUCCESS: {
      const { data } = action;
      return {
        ...defaultState,
        username: data.username,
        isAuthenticated: true,
        token: data.token,
      };
    }
    case LOGIN_FAILURE: {
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

export default userReducer;
