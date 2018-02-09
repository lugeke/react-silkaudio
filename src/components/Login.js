import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

import { login } from '../actions';

class LoginForm extends React.Component {
  handleLogin = () => {
    const { username, password } = this.state;
    if (username && password) {
      this.props.dispatch(login(username, password));
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value.trim() });
  }

  state = {
    username: '',
    password: '',
  }

  render() {
    const { username, password } = this.state;
    const { isAuthenticating, error } = this.props;
    return (
      <Form
        error={error !== ''}
        className='loginForm'
        onSubmit={this.handleLogin}
      >
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
        <Message
          error
          header={error}
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
