import React from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AudiobookPlay from './AudiobookPlay';


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
    dispatch({
      type: 'AUDIO.play',
      id,
    });
  },

  handlePauseClick: ({ id, chapterProgress }) => {
    dispatch({
      type: 'AUDIO.pause',
      id,
      chapterProgress,
    });
  },

  handleAudioEnded: ({ id }) => {
    dispatch({
      type: 'AUDIO.end',
      id,
    });
  },

});

const RecentAudiobookPlayList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AudiobookPlayList);

export default RecentAudiobookPlayList;
