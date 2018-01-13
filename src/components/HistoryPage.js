import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';

import RecentAudiobookPlayList from './AudiobookPlayList';

class HistoryPage extends Component {
  render() {
    return (
      <Container>
        <RecentAudiobookPlayList />
        {/* <PageList count={userHistory.count} /> */}
      </Container>

    );
  }
}

export default HistoryPage;
