import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

import { register } from '../actions';

const defaultError = {
  usernameError: false,
  emailError: false,
  passwordError: false,
  errors: [],
};

class RegisterForm extends React.Component {
  handleLogin = () => {
    const { username, password, email } = this.state;
    if (username && password && email) {
      this.props.dispatch(register(email, username, password));
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value.trim() });
  }

  state = {
    username: '',
    email: '',
    password: '',
    ...defaultError,
  }

  componentWillReceiveProps(nextProps) {
    const { error } = nextProps;
    console.log('register componentWillReceiveProps nextprops ', nextProps);
    const state = { ...defaultError };
    const errors = [];
    if (error) {
      Object.entries(error).forEach(([ key, value ]) => {
        state[`${key}Error`] = true;
        errors.push(...value);
      });
    }
    state.errors = errors;
    this.setState({ ...state });
  }

  render() {
    const { username, password, email } = this.state;
    const { isRegistering, error } = this.props;
    return (
      <Form
        error={error !== undefined}
        className='emailForm'
        onSubmit={this.handleLogin}
      >
        <Form.Input
          error={this.state.emailError}
          name='email'
          placeholder='email'
          type='email'
          value={email}
          onChange={this.handleChange}
        />
        <Form.Input
          error={this.state.usernameError}
          name='username'
          placeholder='username'
          value={username}
          onChange={this.handleChange}
        />
        <Form.Input
          error={this.state.passwordError}
          name='password'
          type='password'
          placeholder='password'
          value={password}
          onChange={this.handleChange}
        />
        <Message error>
          <Message.List>
            {this.state.errors.map(e => <Message.Item>{e}</Message.Item>)}
          </Message.List>
        </Message>
        <Button
          type='submit'
          loading={isRegistering}
          disabled={isRegistering}
        >
          Submit
        </Button>
      </Form>
    );
  }
}

export default RegisterForm;
