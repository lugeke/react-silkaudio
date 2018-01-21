import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Grid,
  Header,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {
  withRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import './App.css';
import RecentAudiobooks from './RecentAudiobooks';
import AllAudiobooks from './AllAudiobooks';
import AudioPlay from './AudioPlay';

const Navigate = (props, { router }) => (
  <Segment
    inverted
    textAlign='center'
    style={{ padding: '1em 0em' }}
    vertical
    fixed='top'
  >
    <Container>
      <Menu
        inverted
        pointing
        secondary
        style={{ padding: '1em 0em' }}
        size='large'
      >
        <Menu.Item active={
          router.history.location.pathname === '/audiobooks/recent' ||
          router.history.location.pathname === '/'}
        >
          <Link to='/audiobooks/recent'> Recent </Link>
        </Menu.Item>
        <Menu.Item
          active={router.history.location.pathname === '/audiobooks/all'}
        >
          <Link to='/audiobooks/all'> All </Link>
        </Menu.Item>
        <Menu.Item position='right'>
          <Button as='a' inverted>Log in</Button>
          <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </Menu.Item>
      </Menu>
    </Container>
  </Segment>
);

Navigate.contextTypes = {
  router: PropTypes.object,
};

class HomepageLayout extends Component {
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
                    <List.Item as='a'>Religious Ceremonies</List.Item>
                    <List.Item as='a'>Gazebo Plans</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header inverted as='h4' content='Services' />
                  <List link inverted>
                    <List.Item as='a'>Banana Pre-Order</List.Item>
                    <List.Item as='a'>DNA FAQ</List.Item>
                    <List.Item as='a'>How To Access</List.Item>
                    <List.Item as='a'>Favorite X-Men</List.Item>
                  </List>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Header as='h4' inverted>Footer Header</Header>
                  <p>Extra space </p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}


class App extends Component {
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
}

const mapStateToProps = (state) => (state);

export default withRouter(connect(mapStateToProps)(App));
