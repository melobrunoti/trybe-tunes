import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: '',
      loading: true,
    };
  }

  async componentDidMount() {
    this.user();
  }

  async user() {
    const user = await getUser();

    this.setState({
      user,
      loading: false,
    });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>
        {(loading) ? <Loading /> : null}
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.description}</p>
          <img
            data-testid="profile-image"
            src={ user.image }
            alt={ user.name }
          />

        </div>

      </div>
    );
  }
}
