import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import { updateUser, getUser } from '../services/userAPI';
import Loading from './Loading';

export default class ProfileEdit extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      name: '',
      email: '',
      image: '',
      description: '',
      isSaveButtonDisabled: false,
      redirect: false,
    };
    this.checkButton = this.checkButton.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.loadUser();
  }

handleChange = ({ target }) => {
  const { name } = target;

  this.setState(() => ({ [name]: target.value }), () => {
    this.checkButton();
  });
}

checkButton = () => {
  let result = true;
  const { name, email, image, description } = this.state;

  if (name.length && image.length && description.length && email.length > 0) {
    result = false;
  }

  if (!email.includes('@')) {
    result = true;
  }

  this.setState({ isSaveButtonDisabled: result });
}

saveUser() {
  const { name, email, image, description } = this.state;
  this.setState({
    loading: true,
  });

  updateUser({ name, email, image, description });

  this.setState({
    loading: false,
    redirect: true,
  });
}

async loadUser() {
  this.setState({
    loading: true,
  });
  await getUser().then(({ name, email, description, image }) => this.setState({
    name, email, description, image }));

  this.setState({
    loading: false,
  });
}

render() {
  const { image,
    name,
    email,
    description,
    isSaveButtonDisabled,
    loading,
    redirect } = this.state;
  if (redirect) return <Redirect to="/profile" />;

  return (
    <div data-testid="page-profile-edit">
      <Header />

      {(loading) ? <Loading /> : null}
      <label htmlFor="image">
        Imagem
        <input
          data-testid="edit-input-image"
          id="image"
          name="image"
          value={ image }
          onChange={ this.handleChange }
        />
      </label>

      <label htmlFor="name">
        Nome
        <input
          data-testid="edit-input-name"
          id="name"
          name="name"
          type="text"
          value={ name }
          onChange={ this.handleChange }
        />
      </label>

      <label htmlFor="email">
        Email
        <input
          data-testid="edit-input-email"
          id="email"
          name="email"
          type="email"
          value={ email }
          onChange={ this.handleChange }
        />
      </label>

      <label htmlFor="description">
        Description
        <textarea
          data-testid="edit-input-description"
          id="description"
          name="description"
          type="text"
          value={ description }
          onChange={ this.handleChange }
        />
      </label>

      <button
        type="button"
        data-testid="edit-button-save"
        onClick={ this.saveUser }
        disabled={ isSaveButtonDisabled }
      >
        salvar
      </button>
    </div>

  );
}
}
