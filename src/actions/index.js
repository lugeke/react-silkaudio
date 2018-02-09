import idbKeyval from 'idb-keyval';

import {
  getAudiobooks, loginUser, getHistories,
} from '../utils';


export const FETCH_AUDIOBOOKS = 'FETCH_AUDIOBOOKS';

export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';
export const ON_AUDIO_PLAY = 'ON_AUDIO_PLAY';
export const ON_AUDIO_PAUSE = 'ON_AUDIO_PAUSE';
export const ON_AUDIO_END = 'ON_AUDIO_END';


export const FETCH_RECENT_LISTEN_REMOTE = 'FETCH_RECENT_LISTEN_REMOTE';

export const SAVE_PROGRESS = 'SAVE_PROGRESS';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const RECENT_SUCCESS = 'RECENT_SUCCESS';
export function onAudioPlay(id) {
  return {
    type: ON_AUDIO_PLAY,
    id,
  };
}

export function saveProgress(id, progress) {
  return {
    type: SAVE_PROGRESS,
    id,
    progress,
  };
}

export function onAudioPause(id, progress) {
  return {
    type: ON_AUDIO_PAUSE,
    id,
    progress,
  };
}

export function onAudioEnd(id) {
  return {
    type: ON_AUDIO_END,
    id,
  };
}

export function playAudio(id, pause) {
  return {
    type: PLAY_AUDIO,
    id,
    pause,
  };
}

export function pauseAudio(id, pause) {
  return {
    type: PAUSE_AUDIO,
    id,
    pause,
  };
}

export function successRecent(data) {
  return {
    type: RECENT_SUCCESS,
    data,
  };
}

export function requestRecentRemote(token) {
  return dispatch => {
    return getHistories(token).then(response => {
      console.log('histories ', response);
      dispatch(successRecent(response));
    });
  };
}

export function addAudiobooks(audiobooks) {
  return {
    type: FETCH_AUDIOBOOKS,
    audiobooks,
  };
}


export function fetchAudiobooks(histories) {
  return dispatch => {
    return getAudiobooks().then(audiobooks =>
      dispatch(addAudiobooks(audiobooks.results)));
  };
}

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function successLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

function failLogin(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

function saveLoginUser(data) {
  idbKeyval.set('user', data);
}

export function login(username, password) {
  return dispatch => {
    dispatch(requestLogin());
    return loginUser(username, password).then(response => {
      dispatch(successLogin(response));
      saveLoginUser(response);
      dispatch(requestRecentRemote(response.token));
    }).catch(error => {
      console.log(error);
      if (typeof error.response !== 'undefined' &&
      error.response.status === 401) {
        // Invalid authentication credentials
        return error.response.json().then((data) => {
          console.log(data);
          dispatch(failLogin(data.detail));
        });
      } else if (typeof error.response !== 'undefined' &&
      error.response.status >= 500) {
        // Server side error
        dispatch(failLogin('A server error occurred while sending your data!'));
      } else {
        // Most likely connection issues
        dispatch(failLogin('Connection Error'));
      }
      return Promise.resolve();
    });
  };
}
