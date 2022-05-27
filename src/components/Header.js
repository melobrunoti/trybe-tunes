import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      loading: false,
    };
    this.user = this.user.bind(this);
  }

  componentDidMount() {
    this.user();
  }

  async user() {
    const res = await getUser();

    this.setState({
      name: res.name,
      loading: false,
    });
  }

  render() {
    const { name, loading } = this.state;

    if (loading) return <Loading />;
    return (
      <header className="header" data-testid="header-component">
        <h2 className='header__user' data-testid="header-user-name">{name}</h2>
        <div className='header__nav'>
          <Link to="/search" data-testid="link-to-search" className='header__nav__link'>Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites" className='header__nav__link' >Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile" className='header__nav__link' >Profile</Link>
        </div>
      </header>
    );
  }
}
