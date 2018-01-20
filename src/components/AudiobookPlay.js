import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import FlexParagraph from './FlexParagraph';
import { playAudio, pauseAudio } from '../actions';

class AudiobookPlay extends Component {
  state = {
    pause: true,
    // currentTime: this.props.chapter.recent.time,
  }

  // getAudioRecourseUrl(type, p = this.props) {
  //   switch (type) {
  //     case 'img': {
  //       return `/audio/${p.recent.audiobookId}/cover.jpg`;
  //     }
  //     case 'hls': {
  //       return `/audio/${p.recent.audiobookId}/hls/output.m3u8`;
  //     }
  //     default: {
  //       return '';
  //     }
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps', this.props, nextProps);
    const pause = this.props.id !== nextProps.playId || nextProps.pause;
    this.setState({ pause });
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.id !== nextProps.playId && this.state.pause) {
      return false;
    } else return true;
  }


  handlePlayClick = (e) => {
    // console.log(`playClick ${this.audio.src}`);

    //this.props.dispatch(togglePause(this.props.id, !this.state.pause));
    if (this.state.pause) {
      this.props.dispatch(playAudio(this.props.id, false));
    } else {
      this.props.dispatch(pauseAudio(this.props.id, true));
    }
  }

  render() {
    console.log('AudiobookPlay render');
    // console.log(this.props);

    return (
      <div className='audiobookplay' >
        <Image size='medium' src={`/audio/${this.props.id}/cover.jpg`} />

        <Button
          className='playButton'
          circular
          icon={this.state.pause ? 'play' : 'pause'}
          onClick={this.handlePlayClick}
          size='huge'
        />
        {/* <audio
          ref='audio'
          preload='metadata'
          id={this.props.recent.audiobookId}
          src={this.getAudioRecourseUrl('hls')}
        /> */}
      </div>


    );
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // change to next chapter, need play audio
  //   if (
  //     prevProps.recentChapter !== this.props.recentChapter
  //     && this.props.recentChapter) {
  //     this.handlePlayClick();
  //   }
  // }

  // audioOnPlay = () => {
  //   this.setState({ pause: false });
  //   this.props.onPlayClick({ id: this.props.recent.audiobookId });
  // }
  // audioOnPause = () => {
  //   this.setState({ pause: true });
  //   this.props.onPauseClick({
  //     id: this.props.recent.audiobookId,
  //     chapterProgress: this.audio.currentTime,
  //   });
  // }

  // componentDidMount() {
  //   this.audio = this.refs.audio;
  //   this.audio.onended = () => {
  //     this.props.onAudioEnded({
  //       id: this.props.recent.audiobookId,
  //     });
  //   };
  //   this.audio.onplay = this.audioOnPlay;
  //   this.audio.onpause = this.audioOnPause;
  // }
}


export default connect()(AudiobookPlay);
