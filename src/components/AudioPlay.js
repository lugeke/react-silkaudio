/* eslint-disable prefer-destructuring */
import { connect } from 'react-redux';
import React from 'react';
import { onAudioPlay, onAudioPause,
  onAudioEnd, saveProgress } from '../actions';


class AudioPlay extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.playId !== this.props.playId) {
      if (!this.props.pause) {
        this.props.dispatch(saveProgress(
          this.props.playId,
          this.audio.currentTime,
        ));
      }
      this.audio.src = `/audio/${nextProps.playId}/hls/output.m3u8`;
      this.audio.load();
    }
  }

  render() {
    return null;
  }

  audioOnPlay = () => {
    this.props.dispatch(onAudioPlay(this.props.playId));
  }
  audioOnPause = () => {
    this.props.dispatch(onAudioPause(
      this.props.playId,
      this.audio.currentTime,
    ));
  }

  componentDidMount() {
    this.audio = document.createElement('audio');
    this.audio.onended = () => {
      this.props.dispatch(onAudioEnd(this.props.playId));
    };
    this.audio.onplay = this.audioOnPlay;
    this.audio.onpause = this.audioOnPause;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pause) {
      this.audio.pause();
    } else {
      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          this.audio.currentTime = this.props.progress;
          console.log(`audio.currentTime ${this.audio.currentTime} progress ${this.props.progress}`);
        }, reason => {
          console.log('promise reject-', reason);
          this.audio.pause();
        })
          .catch(error => {
            console.log('promise error ', error);
            this.audio.pause();
          });
      }
    }
  }
}
const mapStatesToProps = (state) => {
  const { playStatus, recentListen } = state;
  let progress;
  if (playStatus.playId === 0) {
    progress = 0;
  } else {
    progress = recentListen.allIds[playStatus.playId].progress;
  }
  return {
    playId: playStatus.playId,
    pause: playStatus.pause,
    progress,
  };
};

export default connect(mapStatesToProps)(AudioPlay);
