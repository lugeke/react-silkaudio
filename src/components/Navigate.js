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

import LoginForm from './Login';
import DimmerPage from './DimmerPage';
import RegisterForm from './Register';

const Register = DimmerPage(RegisterForm);
const Login = DimmerPage(LoginForm);

class Navigate extends React.Component {
  state = {
    showLogin: false,
    showRegister: false,
    activeItem: 'recent',
  }

  handleClick = (e, data) => {
    console.log('loginclick data', data);
    this.setState(state => ({ [data.name]: !state[data.name] }));
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  renderLoginUsername() {
    if (this.props.user.isAuthenticated) {
      return (
        <Button inverted style={{ marginLeft: '0.5em' }}>
          {this.props.user.username}
        </Button>);
    } else {
      return (
        <React.Fragment>
          <Button inverted name='showLogin' onClick={this.handleClick}>
            Log in
          </Button>
          <Button
            name='showRegister'
            inverted
            onClick={this.handleClick}
            style={{ marginLeft: '0.5em' }}
          >
            Sign Up
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    const { activeItem } = this.state;
    console.log('navigate render state ', this.state);
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
              as={Link}
              to='/audiobooks/recent'
            >
              Recent
            </Menu.Item>

            <Menu.Item
              name='all'
              active={activeItem === 'all'}
              onClick={this.handleItemClick}
              as={Link}
              to='/audiobooks/all'
            >
              All
            </Menu.Item>

            <Menu.Item position='right'>
              {this.renderLoginUsername()}
            </Menu.Item>
          </Menu>
        </Container>
        <Login
          {...this.props.user}
          dispatch={this.props.dispatch}
          close={() => this.handleClick(null, { name: 'showLogin' })}
          active={this.state.showLogin && !this.props.user.isAuthenticated}
        />
        <Register
          {...this.props.register}
          dispatch={this.props.dispatch}
          close={() => this.handleClick(null, { name: 'showRegister' })}
          active={this.state.showRegister && !this.props.register.isRegistered}
        />

      </Segment >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    register: state.register,
  };
};

export default connect(mapStateToProps)(Navigate);
