import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { fetchAudiobooks } from '../actions';
import AudiobookPlay from './AudiobookPlay';

class AllAudiobooks extends Component {
  render() {
    const { byIds } = this.props.audiobooks;
    return (
      <Container>
        <div className='playlist'>
          {byIds.map(id => (
            <AudiobookPlay
              playId={this.props.playId}
              key={id}
              id={id}
              pause={this.props.pause}
              onPauseClick={this.props.handlePauseClick}
              onAudioEnded={this.props.handleAudioEnded}
              onPlayClick={this.props.handlePlayClick}
            />
          ))}
        </div>
        {/* <PageList count={userHistory.count} /> */}
      </Container>

    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAudiobooks());
  }
}


export default connect()(AllAudiobooks);
