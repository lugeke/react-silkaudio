/* eslint-disable no-undef */
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
}

export function getAudiobooks() {
  return fetch('/api/v1.0/audiobooks/', {
    headers: {
      Accept: 'application/json',
    },
  }).then(checkStatus)
    .then(parseJSON);
}

export function loginUser(username, password) {
  const auth = window.btoa(`${username}:${password}`);
  return fetch('/api/v1.0/accounts/login/', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      Authorization: `Basic ${auth}`,
    },
  }).then(checkStatus)
    .then(parseJSON);
}

export function registerUser(email, username, password) {
  return fetch('/api/v1.0/accounts/register/', {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, username, password }),
  }).then(checkStatus)
    .then(parseJSON);
}

export function getHistories(token) {
  return fetch('/api/v1.0/history/', {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then(checkStatus)
    .then(parseJSON);
}

export function updateHistory(data, token) {
  return fetch('/api/v1.0/history/', {
    method: 'put',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then(checkStatus)
    .then(parseJSON);
}

export function authenticateToken(token) {
  return fetch('/api/v1.0/accounts/user/', {
    headers: {
      Accept: 'application/json',
      Authorization: `Token ${token}`,
    },
  }).then(checkStatus)
    .then(parseJSON);
}

