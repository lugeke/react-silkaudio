import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AudiobookPlay from './AudiobookPlay';
import { addRecentAudiobooks } from '../actions';

class RecentAudiobooks extends Component {
  render() {
    const { byIds, allIds } = this.props.recentListen;
    return (
      <Container>
        <div className='playlist'>
          {byIds.map(id => (
            <AudiobookPlay
              playId={this.props.playId}
              id={id}
              key={id}
              onPauseClick={this.props.handlePauseClick}
              onAudioEnded={this.props.handleAudioEnded}
              onPlayClick={this.props.handlePlayClick}
            />))}
        </div>
        {/* <PageList count={userHistory.count} /> */}
      </Container>

    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let recentListen = localStorage.getItem('recentListen');
    if (recentListen) {
      recentListen = JSON.parse(recentListen);
      dispatch(addRecentAudiobooks(recentListen));
    }
  }
}


export default connect()(RecentAudiobooks);
