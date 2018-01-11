import React, { Component } from 'react';
import RecentAudiobookPlayList from './AudiobookPlayList';

class HistoryPage extends Component {
  render() {
    return (
      <div>
        <RecentAudiobookPlayList />
        {/* <PageList count={userHistory.count} /> */}
      </div>

    );
  }
}

export default HistoryPage;
