import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import FlexParagraph from './FlexParagraph';

class AudiobookPlay extends Component {
  state = {
    pause: true,
    // currentTime: this.props.chapter.recent.time,
  }


  componentDidMount() {
    this.audio = document.createElement('audio');
    this.audio.id = this.props.audiobook.id;
    this.audio.src = this.getAudioRecourseUrl('mp3');
    console.log('this.audio.src', this.audio.src);
    this.audio.type = 'audio/mpeg';
    this.audio.preload = 'auto';
    this.audio.currentTime = this.props.chapterProgress;
    this.audio.onended = () => this.props.onAudioEnded({
      id: this.props.audiobook.id,
    });
  }

  getAudioRecourseUrl(type) {
    switch (type) {
      case 'mp3': {
        return `/audio/${this.props.audiobook.id}/${this.props.recentChapter}.mp3`;
      }
      case 'img': {
        return `/audio/${this.props.audiobook.id}/cover.jpg`;
      }
      default: {
        return '';
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', this.props, nextProps);

    if (this.props.audiobook.id !== nextProps.playId && !this.state.pause) {
      this.handlePlayClick();
    }

    if (!nextProps.recentChapter) { // audiobook finish
      this.setState({ pause: true });
    } else if (nextProps.recentChapter !== this.props.recentChapter) {
      this.audio.src = this.getAudioRecourseUrl('mp3');
      console.log('audioPlay');
      this.audio.play();
    }
  }


  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.audiobook.id !== nextProps.playId && this.state.pause) {
      return false;
    } else return true;
  }


  handlePlayClick = (e) => {
    console.log(`playClick ${this.audio.src}`);
    if (this.state.pause) {
      this.audio.play();
      this.props.onPlayClick({ id: this.props.audiobook.id });
    } else {
      this.audio.pause();
      this.props.onPauseClick({
        id: this.props.audiobook.id,
        chapterProgress: this.audio.currentTime,
      });
    }
    const pause = !this.state.pause;
    this.setState({ pause });
  }

  render() {
    console.log('AudiobookPlay render');
    console.log(this.props);
    const { title, author, description } = this.props.audiobook;

    return (
      <Card className="audiobook">
        <div>
          <Image src={this.getAudioRecourseUrl('img')} />

          <Button
            className='playButton'
            circular
            icon={this.state.pause ? 'play' : 'pause'}
            onClick={this.handlePlayClick}
            size='huge'
          />
        </div>

        <Card.Content>

          <Card.Header>
            <p className='bookTitle'>
              {title}
            </p>

          </Card.Header>

          <Card.Meta>
            <span className=''>
              {author}
            </span>
          </Card.Meta>

          <Card.Description>
            <FlexParagraph text={description} />
          </Card.Description>

        </Card.Content>

      </Card>
    );
  }
}

export default AudiobookPlay;
