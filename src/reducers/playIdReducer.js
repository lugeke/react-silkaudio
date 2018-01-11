const playIdReducer = (state = '0', action) => {
  if (action.type === 'AUDIO.play') {
    return action.id;
  } else {
    return state;
  }
};

export default playIdReducer;
