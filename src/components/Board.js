import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
    };
  }

  componentDidMount() {
    const BASE_URL = this.props.url
    const BOARD = this.props.boardName
    const CARDS = '/cards'

    axios.get(BASE_URL + BOARD + CARDS)
    .then((response) => {
      console.log(response.data)
      const cards = response.data;

      this.setState({cards: cards});
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render() {
    const cardCollection = this.state.cards.map((post) => {
          return <Card
            key={post.card.id}
            emoji={post.card.emoji}
            text={post.card.text}
            />
        })

    return (
      <div className="board">
        {cardCollection}
      </div>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
