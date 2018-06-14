import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import './Board.css';
import Card from './Card';
import NewCardForm from './NewCardForm';
import UpdateCardForm from './UpdateCardForm';
// import CARD_DATA from '../data/card-data.json';

class Board extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      editing: '',
    };
  }

  componentDidMount() {
    const BASE_URL = this.props.url
    const BOARD = this.props.boardName
    const CARDS = '/cards'

    axios.get(BASE_URL + BOARD + CARDS)
    .then((response) => {
      const cards = response.data;

      this.setState({cards: cards});
    })
    .catch((error) => {
      console.log(error)
    })
  }

  updateCard = (card, index) => {
    const editingCard = this.state.cards[index].card

    const BASE_URL = this.props.url
    const BOARD = this.props.boardName
    const CARD = `${BASE_URL + BOARD}/cards/${editingCard.id}?emoji=${card.emoji}&text=${card.text}`

    axios.patch(CARD)
    .then((response) => {
      console.log(response.data)
      let updateState = {}
      updateState = this.state
      const newCard = response.data
      updateState.cards[index] = newCard;
      console.log(updateState);
      updateState['editing'] = '';

      this.setState(updateState);
    })
    .catch((error) => {
      console.log(error)
    })


  }

  addCard = (card) => {
    const BASE_URL = this.props.url
    const BOARD = this.props.boardName
    const CARD = `${BASE_URL + BOARD}/cards?emoji=${card.emoji}&text=${card.text}`

    axios.post(CARD)
    .then((response) => {
      console.log(response.data)
      let updateState = {};
      updateState = this.state;

      const newCard = response.data;
      updateState.cards.push(newCard);

      this.setState(updateState);
    })
    .catch((error) => {
      console.log(error)
    })

  }

  removeCard = (card) => {
    const BASE_URL = this.props.url
    const BOARD = this.props.boardName
    const CARD = `${BASE_URL + BOARD}/cards/${card.id}`

    axios.delete(CARD)
    .then((response) => {
      console.log(response.data);
      let updateState = {}
      updateState = this.state;

      const cardIndex = card.index;
      updateState.cards.splice(cardIndex, 1);

      this.setState(updateState);

    })
    .catch((error) => {
      console.log(error)
    })
  }

  toggleEditing = ( itemId ) => {
    console.log(this.state);
    let updateState = {};
    updateState = this.state;
    updateState['editing'] = itemId

    this.setState(updateState);
    console.log(this.state);
  }

  renderItemOrEditField( item, index ) {
    if ( this.state.editing === item.id ) {
      return <UpdateCardForm key={`editing-${index}`} card={item} index={index} updateCardCallback={this.updateCard}/>
    } else {
      return <Card
        key={item.id}
        updateClickCallback={ this.toggleEditing.bind( null, item.id ) }
        id={item.id}
        index={index}
        emoji={item.emoji}
        text={item.text}
        removeCardCallback={this.removeCard}
        />
    }
  }

  render() {
    const cardCollection = this.state.cards.map(( post, index ) => {
      return this.renderItemOrEditField( post.card, index );
    })

    return (
      <section className="board">
        {cardCollection}
        <article>
          <NewCardForm addCardCallback={this.addCard}/>
        </article>
      </section>
    )
  }

}

Board.propTypes = {
  url: PropTypes.string.isRequired,
  boardName: PropTypes.string.isRequired
};

export default Board;
