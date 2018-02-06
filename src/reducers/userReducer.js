import {
  LOGIN_REQUEST, LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from '../actions';

const userReducer = (state = {
  username: '',
  isAuthenticated: false,
  isAuthenticating: false,
  token: '',
}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        isAuthenticating: true,
        isAuthenticated: false,
      };
    }
    case LOGIN_SUCCESS: {
      const { data } = action;
      return {
        username: data.username,
        isAuthenticating: false,
        isAuthenticated: true,
        token: data.token,
      };
    }
    case LOGIN_FAILURE: {
      return {
        isAuthenticating: false,
        isAuthenticated: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;
