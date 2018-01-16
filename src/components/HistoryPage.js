import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import RecentAudiobookPlayList from './AudiobookPlayList';

import { addAudiobooks, fetchAudiobooks } from '../actions';

class HistoryPage extends Component {
  render() {
    return (
      <Container>
        <RecentAudiobookPlayList />
        {/* <PageList count={userHistory.count} /> */}
      </Container>

    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    let audiobookIdList = localStorage.getItem('audiobookIdList');
    if (audiobookIdList) {
      audiobookIdList = JSON.parse(audiobookIdList);
      const audiobooks = audiobookIdList.map(id => JSON.parse(localStorage.getItem(`audiobook_${id}`)));
      audiobooks.sort((x, y) => y.recentListen - x.recentListen);
      dispatch(addAudiobooks(audiobooks));
    } else {
      dispatch(fetchAudiobooks());
    }
  }
}


export default connect()(HistoryPage);
