import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      loading: false,
      redirect: false,
    };

    this.submitButton = this.submitButton.bind(this);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  }

  async submitButton() {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false, redirect: true });
  }

  // how to redirect ---- https://stackoverflow.com/questions/45089386/what-is-the-best-way-to-redirect-a-page-using-react-router

  render() {
    const { name, redirect, loading } = this.state;
    const minLenght = 3;

    if (loading) return <Loading />;

    if (redirect) return <Redirect to="/search" />;

    return (
      <div className='login-page' data-testid="page-login">
        <div className='login' >
          <h1 className='login__title'>TrybeTunes</h1>
        <input 
          className='login__input'
          type="text"
          data-testid="login-name-input"
          onChange={ this.handleChange }
        />

        <button
          className='login__button'
          type="button"
          data-testid="login-submit-button"
          disabled={ name.length < minLenght }
          onClick={ this.submitButton }
        >
          Entrar
        </button>
        </div>
      </div>

    );
  }
}
