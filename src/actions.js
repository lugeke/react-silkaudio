
export const REQUEST_POPULAR = 'REQUEST_POPULAR';
export const RECEIVE_POPULAR = 'RECEIVE_POPULAR';
export const FETCH_AUDIOBOOKS = 'FETCH_AUDIOBOOKS';


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
