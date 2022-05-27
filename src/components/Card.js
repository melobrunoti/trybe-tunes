import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { album: {
      artistName,
      collectionId,
      collectionName,
      artworkUrl100,
    } } = this.props;

    return (
      <div className='card'>
        <img className='card__img' src={ artworkUrl100 } alt={ collectionName } />
        <div>{ collectionName }</div>
        <div>{ artistName }</div>
        <Link className='card__link'
          to={ `album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          See more
        </Link>

      </div>
    );
  }
}

// https://stackoverflow.com/questions/41808428/react-proptypes-allow-different-types-of-proptypes-for-one-prop

Card.propTypes = {
  album: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,

};
