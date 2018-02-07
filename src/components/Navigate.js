import React from 'react';
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

class Navigate extends React.Component {
  state = {
    showLogin: false,
    activeItem: 'recent',
  }
  handleLoginClick = (e) => {
    console.log('loginclick');
    this.setState({ showLogin: true });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderLoginUsername() {
    if (this.props.isAuthenticated) {
      return (
        <Button inverted style={{ marginLeft: '0.5em' }}>
          {this.props.username}
        </Button>);
    } else {
      return (
        <React.Fragment>
          <Button inverted onClick={this.handleLoginClick}>
            Log in
          </Button>
          <Button inverted style={{ marginLeft: '0.5em' }}>
            Sign Up
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    const { activeItem } = this.state;
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
            <Menu.Item
              name='recent'
              active={activeItem === 'recent'}
              onClick={this.handleItemClick}
            >
              <Link to='/audiobooks/recent'> Recent </Link>
            </Menu.Item>

            <Menu.Item
              name='all'
              active={activeItem === 'all'}
              onClick={this.handleItemClick}
            >
              <Link to='/audiobooks/all'> All </Link>
            </Menu.Item>

            <Menu.Item position='right'>
              {this.renderLoginUsername()}
            </Menu.Item>
          </Menu>
        </Container>
        { this.state.showLogin && !this.props.isAuthenticated ?
          <Login {...this.props} active /> : null }
      </Segment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isAuthenticating: state.user.isAuthenticating,
    username: state.user.username,
  };
};

export default connect(mapStateToProps)(Navigate);
