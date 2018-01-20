import { connect } from 'react-redux';
import React, { Component } from 'react';
import { onAudioPlay, onAudioPause, onAudioEnd } from '../actions';


class AudioPlay extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.playId !== this.props.playId && !this.props.pause) {
      // change audiobook, need save progress
      this.props.dispatch(onAudioPause(
        this.props.playId,
        this.audio.currentTime,
      ));
    }
  }

  render() {
    return (<audio
      ref='audio'
      preload='metadata'
      src={`/audio/${this.props.playId}/hls/output.m3u8`}
    />);
  }

  audioOnPlay = () => {
    this.props.dispatch(onAudioPlay(this.props.playId));
  }
  audioOnPause = () => {
    this.props.dispatch(onAudioPause(this.props.playId, this.audio.currentTime));
  }

  componentDidMount() {
    this.audio = this.refs.audio;
    this.audio.onended = () => {
      this.props.dispatch(onAudioEnd(this.props.playId));
    };
    this.audio.onplay = this.audioOnPlay;
    this.audio.onpause = this.audioOnPause;
  }

  componentDidUpdate(prevProps, prevState) {
    // change to next chapter, need play audio
    // if (
    //   prevProps.recentChapter !== this.props.recentChapter
    //   && this.props.recentChapter) {
    //   this.handlePlayClick();
    // }
    // if (this.props.playId === 0) { return; }

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
  return { playId: playStatus.playId, pause: playStatus.pause, progress: recentListen.allIds[playStatus.playId].progress };
};

export default connect(mapStatesToProps)(AudioPlay);
