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
import { addRecentAudiobooks, successLogin } from '../actions';
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
    const {
      playStatus, audiobooks, recentListen,
    } = this.props;
    return (
      <HomepageLayout >
        <Switch>
          <Route
            path='/audiobooks/recent'
            render={(props) =>
              (<RecentAudiobooks
                playId={playStatus.playId}
                pause={playStatus.pause}
                recentListen={recentListen}
              />)
            }
          />

          <Route
            path='/audiobooks/all'
            render={(props) =>
              (<AllAudiobooks
                playId={playStatus.playId}
                pause={playStatus.pause}
                audiobooks={audiobooks}
              />)
            }
          />

          <Route
            path='/'
            exact
            render={(props) =>
              (<RecentAudiobooks
                playId={playStatus.playId}
                pause={playStatus.pause}
                recentListen={recentListen}
              />)
            }
          />
        </Switch>
        <AudioPlay />
      </HomepageLayout>

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
    idbKeyval.get('user').then(val => {
      if (val) {
        authenticateToken(val.token).then(response => {
          console.log('authenticateToken', response);
          response.token = val.token;
          dispatch(successLogin(response));
        });
      }
    });
  }
}

const mapStateToProps = (state) => (state);

export default withRouter(connect(mapStateToProps)(App));
