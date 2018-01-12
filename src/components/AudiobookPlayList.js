import React from 'react';
import { Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AudiobookPlay from './AudiobookPlay';

const AudiobookPlayList = (props) => {
  console.log('AudiobookPlayList render');
  return (
    <Card.Group>
      {props.histories.map(h => (
        <AudiobookPlay
          playId={props.playId}
          key={h.audiobook.id}
          audiobook={h.audiobook}
          recentChapter={h.progress.recentChapter}
          chapterProgress={h.progress.all[h.progress.recentChapter]}
          onPauseClick={props.handlePauseClick}
          onAudioEnded={props.handleAudioEnded}
          onPlayClick={props.handlePlayClick}
        />))}
    </Card.Group>
  );
};

const mapStateToProps = (state) => {
  const { histories, playId } = state;
  return { histories, playId };
};


const mapDispatchToProps = dispatch => ({
  handlePlayClick: ({ id }) => {
    console.log(`handlePlayClick ${id}`);
    dispatch({
      type: 'AUDIO.play',
      id,
    });
  },

  handlePauseClick: ({ id, chapterProgress }) => {
    console.log(id, chapterProgress);
    dispatch({
      type: 'AUDIO.pause',
      id,
      chapterProgress,
    });
  },

  handleAudioEnded: ({ id }) => {
    console.log(`handleAudioEnded ${id}`);
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
