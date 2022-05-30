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
    const { albums, search } = this.state;
    return (albums.length === 0) ? <p>Nenhum álbum foi encontrado</p>
      : (
        <>
          <h2 className='results'>
            {`Resultado de álbuns de: ${search}`}
          </h2>
          <div className='results-container'>
            { albums.map((album) => (
              <Card
                key={ album.collectionId }
                album={ album }
              />
            ))};
          </div>
        </>
      )};

  render() {
    const { searchInput, loading, request } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <Header />

        <div className='search'>
          <div className='search-container'> 
          <input
            className='search__input'
            data-testid="search-artist-input"
            type="text"
            value={ searchInput }
            onChange={ this.handleChange }
          />

          <button
            className='search__button'
            data-testid="search-artist-button"
            type="button"
            disabled={ searchInput.length < minLength }
            onClick={ this.onSearch }
          >
            Search
          </button>

          </div>
        </div>
 


        {(loading) ? <Loading />
          : (
            <>
          <div >
             {(request) && this.renderAlbums() }
          </div>
          </>
          )}     
      </div>
    );
  }
}
