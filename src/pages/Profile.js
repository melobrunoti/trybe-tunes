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
      <div  data-testid="page-profile">
        <Header />
        <div className='profile'>
        {(loading) ? <Loading /> :  
        <div className='profile__box'>
        <img
            onError={i => i.target.style.display='none'}
            data-testid="profile-image"
            src={ user.image }
            alt={ user.name }
          />
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.description}</p>
          <Link className='edit' to="/profile/edit">Editar perfil</Link>
         
        </div>
  }
        </div>
      </div>
    );
  }
}
