import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loading';
import Card from '../components/Card';

/* 
***Creditos melhor compreensao de react Victor S.Kamiguchi ***

https://github.com/tryber/sd-016-b-project-trybetunes/pull/58/files */

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      searchInput: '',
      loading: false,
      request: false,
      albums: [],

    };
    this.onSearch = this.onSearch.bind(this);
  }

  handleChange = ({ target: { value } }) => {
    this.setState({
      search: value,
      searchInput: value,
    });
  }

  async onSearch() {
    const { searchInput } = this.state;

    this.setState({
      loading: true,
      search: searchInput,
    });

    const albums = await searchAlbumsAPI(searchInput);

    this.setState({ albums, loading: false, request: true, searchInput: '' });
  }

  renderAlbums() {
    const { albums } = this.state;
    return (albums.length === 0) ? <p>Nenhum álbum foi encontrado</p>
      : (
        albums.map((album) => (
          <Card
            key={ album.collectionId }
            album={ album }
          />
        )));
  }

  render() {
    const { searchInput, search, loading, request } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />

        <input
          data-testid="search-artist-input"
          type="text"
          value={ searchInput }
          onChange={ this.handleChange }
        />

        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ searchInput.length < minLength }
          onClick={ this.onSearch }
        >
          Search
        </button>
        {(loading) ? <Loading />
          : (
            <h2>
              {`Resultado de álbuns de: ${search}`}
            </h2>
          )}
        {(request) && this.renderAlbums() }

      </div>
    );
  }
}
