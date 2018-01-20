// import React from 'react';
// import { Card } from 'semantic-ui-react';
// import { connect } from 'react-redux';
// import AudiobookPlay from './AudiobookPlay';
// import { audioPlay, audioPause, audioEnd } from '../actions';

// const AudiobookPlayList = (props) => {
//   console.log('AudiobookPlayList render');
//   const { byIds, allIds } = props.recentListen;
//   return (
//     <div className='playlist'>
//       {byIds.map(id => (
//         <AudiobookPlay
//           playId={props.playId}
//           key={id}
//           recent={allIds[id]}
//           onPauseClick={props.handlePauseClick}
//           onAudioEnded={props.handleAudioEnded}
//           onPlayClick={props.handlePlayClick}
//         />))}
//     </div>
//   );
// };

// const mapStateToProps = (state) => {
//   const { recentListen, playId } = state;
//   return { recentListen, playId };
// };


// const mapDispatchToProps = dispatch => ({
//   handlePlayClick: ({ id }) => {
//     dispatch(audioPlay(id));
//   },

//   handlePauseClick: ({ id, chapterProgress }) => {
//     dispatch(audioPause(id, chapterProgress));
//   },

//   handleAudioEnded: ({ id }) => {
//     dispatch(audioEnd(id));
//   },

// });

// const RecentAudiobookPlayList = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(AudiobookPlayList);

// export default RecentAudiobookPlayList;
