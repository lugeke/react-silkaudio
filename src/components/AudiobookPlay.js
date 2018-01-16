import React, { Component } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import FlexParagraph from './FlexParagraph';


// const AudioPlay1 = () => {

// };

// class Play extends Component {}

class AudiobookPlay extends Component {
  state = {
    pause: true,
    // currentTime: this.props.chapter.recent.time,
  }


  getAudioRecourseUrl(type, p = this.props) {
    switch (type) {
      case 'mp3': {
        return `/audio/${p.audiobook.id}/${p.recentChapter}.mp3`;
      }
      case 'img': {
        return `/audio/${p.audiobook.id}/cover.jpg`;
      }
      case 'hls': {
        return `/audio/${p.audiobook.id}/${p.recentChapter}/prog_index.m3u8`;
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
      this.audio.src = this.getAudioRecourseUrl('mp3', nextProps);
      console.log('audioPlay ', this.audio.src);
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
      this.audio.currentTime = this.props.chapterProgress;
      console.log(`audio.currentTime ${this.audio.currentTime} chapterProgress ${this.props.chapterProgress}`);

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // this.audio.pause();
          console.log('autoplay');
          this.audio.currentTime = this.props.chapterProgress;
          console.log(`audio.currentTime ${this.audio.currentTime} chapterProgress ${this.props.chapterProgress}`);
        }, _ => {
          console.log('promise reject');
        })
          .catch(error => {
            console.log('promise error ', error);
          });
      }
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
      <Card className='audiobook'>
        <div>
          <Image src={this.getAudioRecourseUrl('img')} />

          <Button
            className='playButton'
            circular
            icon={this.state.pause ? 'play' : 'pause'}
            onClick={this.handlePlayClick}
            size='huge'
          />
          <audio
            ref='audio'
            preload='metadata'
            id={this.props.audiobook.id}
            src={this.getAudioRecourseUrl('hls')}
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

  componentDidMount() {
    console.log('componentDidMount');
    this.audio = this.refs.audio;
    this.audio.currentTime = this.props.chapterProgress;
    this.audio.onended = () => this.props.onAudioEnded({
      id: this.props.audiobook.id,
    });
    console.log(`audio.currentTime ${this.audio.currentTime} chapterProgress ${this.props.chapterProgress}`);
  }
}

export default AudiobookPlay;