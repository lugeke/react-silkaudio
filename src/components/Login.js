import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { login } from '../actions';

class LoginForm extends React.Component {
  handleLogin = () => {
    const { username, password } = this.state;
    if (username && password) {
      console.log('login.');
      this.props.dispatch(login(username, password));
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  state = {
    username: '',
    password: '',
  }
  render() {
    const { username, password } = this.state;
    const { isAuthenticating } = this.props;
    return (
      <Form className='loginForm' onSubmit={this.handleLogin} >
        <Form.Input
          name='username'
          placeholder='username'
          value={username}
          onChange={this.handleChange}
        />
        <Form.Input
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={this.handleChange}
        />
        <Button
          type='submit'
          loading={isAuthenticating}
          disabled={isAuthenticating}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default LoginForm;
