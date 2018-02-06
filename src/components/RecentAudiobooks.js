import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

import AudiobookPlay from './AudiobookPlay';


class RecentAudiobooks extends React.Component {
  render() {
    console.log('render Recent');
    const { byIds } = this.props.recentListen;
    return (
      <Container>
        <div className='playlist'>
          {byIds.map(id => (
            <AudiobookPlay
              playId={this.props.playId}
              id={id}
              key={id}
              pause={this.props.pause}
              onPauseClick={this.props.handlePauseClick}
              onAudioEnded={this.props.handleAudioEnded}
              onPlayClick={this.props.handlePlayClick}
            />))}
        </div>
        {/* <PageList count={userHistory.count} /> */}
      </Container>

    );
  }
}


export default connect()(RecentAudiobooks);
