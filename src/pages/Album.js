import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class Album extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      data: [],
      favoriteSongs: [],
    };
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;

    getMusics(id)
      .then((music) => {
        this.setState({ data: [...music], loading: false });
      });

    this.getFavorites();
  }

  async handleFavorite(music) {
    const { favoriteSongs } = this.state;

    this.setState({
      loading: true,
    });
    if (favoriteSongs.some(({ trackId }) => trackId === music.trackId)) {
      await removeSong(music);
    } else {
      await addSong(music);
    }

    const res = await getFavoriteSongs();
    this.setState({
      favoriteSongs: res,
      loading: false,

    });
  }

  async getFavorites() {
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { loading, data, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {loading ? <Loading /> : null}

        <div>
          <span data-testid="artist-name">{Object(data[0]).artistName}</span>
          <span data-testid="album-name">{Object(data[0]).collectionName}</span>
          <div>
            {data.map((music) => {
              const isChecked = favoriteSongs
                .some((song) => song.trackId === music.trackId);
              if (Object.keys(music).includes('trackName')) {
                return (<MusicCard
                  key={ music.trackId }
                  { ...music }
                  isChecked={ isChecked }
                  handleFavorite={ () => this.handleFavorite(music) }
                />);
              }
              return null;
            })}
          </div>
        </div>
        )
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,

};
