import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { playAudio, pauseAudio } from '../actions';
import ProgressiveImage from './ProgressiveImage';

class AudiobookPlay extends React.Component {
  constructor(props) {
    super(props);
    const pause = props.playId !== this.props.id || this.props.pause;
    this.state = {
      pause,
    };
  }

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

        <ProgressiveImage
          src={`/audio/${this.props.id}/cover.jpg`}
          placeholder={`/audio/${this.props.id}/cover.svg`}
        >
          {(src, loading) => {
            const className = loading ? '' : 'fade-in';
            return <Image size='medium' src={src} className={className} />;
          }}
        </ProgressiveImage>
        <Button
          className='playButton'
          circular
          icon={this.state.pause ? 'play' : 'pause'}
          onClick={this.handlePlayClick}
          size='huge'
        />
      </div>


    );
  }
}


export default connect()(AudiobookPlay);
