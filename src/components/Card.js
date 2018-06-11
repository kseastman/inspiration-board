import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';

import './Card.css';

class Card extends Component {

  render() {
    let cardEmoji = ''
    if (this.props.emoji) {
      cardEmoji = emoji.getUnicode(this.props.emoji);
    }
    return (
      <div className="card">
        <section className="card__content">
        <article className='card__content-emoji'>
          {cardEmoji}
        </article>
        <article className='card__content-text'>
          {this.props.text}
        </article>
        </section>
      </div>
    )
  }
}

Card.propTypes = {
  emoji: PropTypes.string,
  text: PropTypes.string.isRequired
};

export default Card;
