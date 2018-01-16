import React from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AudiobookPlay from './AudiobookPlay';
import { audioPlay, audioPause, audioEnd } from '../actions';

const AudiobookPlayList = (props) => {
  console.log('AudiobookPlayList render');
  return (
    <Card.Group>
      {props.audiobooks.map(a => (
        <AudiobookPlay
          playId={props.playId}
          key={a.audiobook.id}
          audiobook={a.audiobook}
          recentChapter={a.progress.recentChapter}
          chapterProgress={a.progress.all[a.progress.recentChapter]}
          onPauseClick={props.handlePauseClick}
          onAudioEnded={props.handleAudioEnded}
          onPlayClick={props.handlePlayClick}
        />))}
    </Card.Group>
  );
};

const mapStateToProps = (state) => {
  const { audiobooks, playId } = state;
  return { audiobooks, playId };
};


const mapDispatchToProps = dispatch => ({
  handlePlayClick: ({ id }) => {
    dispatch(audioPlay(id));
  },

  handlePauseClick: ({ id, chapterProgress }) => {
    dispatch(audioPause(id, chapterProgress));
  },

  handleAudioEnded: ({ id }) => {
    dispatch(audioEnd(id));
  },

});

const RecentAudiobookPlayList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudiobookPlayList);

export default RecentAudiobookPlayList;
