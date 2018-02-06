import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Menu,
  Segment,
} from 'semantic-ui-react';
import {
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from './Login';
import DimmerPage from './DimmerPage';

const Login = DimmerPage(LoginForm);

class Navigate extends Component {
  state = {
    showLogin: false,
  }
  handleLoginClick = (e) => {
    console.log('loginclick');
    this.setState({ showLogin: true });
  }
  render() {
    const { router } = this.context;
    console.log('router ', router);
    const loginVisibility = this.props.isAuthenticated ? 'hidden' : 'visible';
    const userVisibility = this.props.isAuthenticated ? 'visible' : 'hidden';
    return (
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
              <Button inverted style={{ visibility: loginVisibility }} onClick={this.handleLoginClick}>
                Log in
              </Button>
              <Button inverted style={{ marginLeft: '0.5em', visibility: loginVisibility }}>
                Sign Up
              </Button>
              <Button inverted style={{ marginLeft: '0.5em', visibility: userVisibility }}>
                {this.props.username}
              </Button>
            </Menu.Item>
          </Menu>
        </Container>
        {this.state.showLogin && !this.props.isAuthenticated ?
          <Login active {...this.props} />
          : null}
      </Segment >
    );
  }
}

Navigate.contextTypes = {
  router: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isAuthenticating: state.user.isAuthenticating,
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(Navigate);
