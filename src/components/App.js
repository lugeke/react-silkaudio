import React from 'react';
import {
  Container,
  Grid,
  Header,
  List,
  Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  withRouter,
  Route,
  Switch } from 'react-router-dom';
import idbKeyval from 'idb-keyval';

import './App.css';
import RecentAudiobooks from './RecentAudiobooks';
import AllAudiobooks from './AllAudiobooks';
import AudioPlay from './AudioPlay';
import { requestRecentRemote,
  successLogin } from '../actions';
import Navigate from './Navigate';
import { authenticateToken } from '../utils';


class HomepageLayout extends React.Component {
  render() {
    return (
      <div>
        <Navigate />

        {this.props.children}

        <Segment
          className='footer'
          inverted
          vertical
          style={{ padding: '5em 0em' }}
        >
          <Container>
            <Grid divided inverted stackable>
              <Grid.Row>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='About' />
                  <List link inverted>
                    <List.Item as='a'>Sitemap</List.Item>
                    <List.Item as='a'>Contact Us</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>How To Upload</List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <HomepageLayout >
        <Switch>
          <Route
            path='/audiobooks/recent'
            render={(props) => (<RecentAudiobooks {...this.props} />)}
          />

          <Route
            path='/audiobooks/all'
            render={(props) => (<AllAudiobooks {...this.props} />)}
          />

          <Route
            path='/'
            exact
            render={(props) => (<RecentAudiobooks {...this.props} />)}
          />
        </Switch>
        <AudioPlay />
      </HomepageLayout>

    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    idbKeyval.get('user').then(val => {
      if (val) {
        authenticateToken(val.token).then(response => {
          console.log('authenticateToken', response);
          response.token = val.token;
          dispatch(successLogin(response));
          dispatch(requestRecentRemote(val.token));
        }).catch(e => {
          console.log('authenticateToken error', e.status);
          idbKeyval.delete('user');
        });
      }
    });
  }
}

const mapStateToProps = (state) => {
  const {
    playStatus, audiobooks, recentListen,
  } = state;
  return {
    playStatus, audiobooks, recentListen,
  };
};

export default withRouter(connect(mapStateToProps)(App));
