
export const REQUEST_POPULAR = 'REQUEST_POPULAR';
export const RECEIVE_POPULAR = 'RECEIVE_POPULAR';
export const FETCH_AUDIOBOOKS = 'FETCH_AUDIOBOOKS';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PAUSE_AUDIO = 'PAUSE_AUDIO';
export const ON_AUDIO_PLAY = 'ON_AUDIO_PLAY';
export const ON_AUDIO_PAUSE = 'ON_AUDIO_PAUSE';
export const ON_AUDIO_END = 'ON_AUDIO_END';
export const ADD_RECENT_LISTEN = 'ADD_RECENT_LISTEN';
export const SAVE_PROGRESS = 'SAVE_PROGRESS';

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

export function addRecentAudiobooks(recentListen) {
  return {
    type: ADD_RECENT_LISTEN,
    recentListen,
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
    return fetch('/api/v1.0/audiobooks/')
      .then(response => response.json())
      .then(json => dispatch(addAudiobooks(json.audiobooks)));
  };
}
