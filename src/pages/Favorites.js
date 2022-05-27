import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favoritos extends Component {
  constructor() {
    super();

    this.state = {
      favoriteSongs: [],
      loading: false,
    };
    this.getFavorites = this.getFavorites.bind(this);
    this.removeMusic = this.removeMusic.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  async getFavorites() {
    this.setState({
      loading: true,
    });

    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  async removeMusic(music) {
    this.setState({
      loading: true,
    });

    await removeSong(music);
    const favoriteSongs = await getFavoriteSongs();

    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  render() {
    const { favoriteSongs, loading } = this.state;
    return (

      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : null}
        {favoriteSongs.map((music) => {
          const isChecked = favoriteSongs
            .some((song) => song.trackId === music.trackId);
          return (<MusicCard
            key={ music.trackId }
            { ... music }
            handleFavorite={ () => this.removeMusic(music) }
            isChecked={ isChecked }
          />);
        })}

      </div>

    );
  }
}
