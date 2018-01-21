import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import idbKeyval from 'idb-keyval';

import AudiobookPlay from './AudiobookPlay';
import { addRecentAudiobooks } from '../actions';

class RecentAudiobooks extends Component {
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

  componentDidMount() {
    const { dispatch } = this.props;
    idbKeyval.get('recentListen').then(val => {
      if (val) {
        console.log('recentListen', val);
        dispatch(addRecentAudiobooks(val));
      }
    });
  }
}


export default connect()(RecentAudiobooks);
