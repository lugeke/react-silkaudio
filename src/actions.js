
export const REQUEST_POPULAR = 'REQUEST_POPULAR';
export const RECEIVE_POPULAR = 'RECEIVE_POPULAR';
export const FETCH_AUDIOBOOKS = 'FETCH_AUDIOBOOKS';
export const AUDIO_PLAY = 'AUDIO_PLAY';
export const AUDIO_PAUSE = 'AUDIO_PAUSE';
export const AUDIO_END = 'AUDIO_END';

export function audioPlay(id) {
  return {
    type: AUDIO_PLAY,
    id,
  };
}

export function audioPause(id, chapterProgress) {
  return {
    type: AUDIO_PAUSE,
    id,
    chapterProgress,
  };
}

export function audioEnd(id) {
  return {
    type: AUDIO_END,
    id,
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
      .then(json => dispatch(addAudiobooks(json)));
  };
}
