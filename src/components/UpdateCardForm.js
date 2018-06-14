import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './UpdateCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

export default class UpdateCardForm extends Component {

  static propTypes = {
    updateCardCallback: PropTypes.func.isRequired,
    card: PropTypes.object,
    index: PropTypes.number
  }

  constructor(props) {
    super();

    this.state = {
      emoji: '',
      text: ''
    }
  }

  componentDidMount() {
    const card = this.props.card

    let newState = {}
    newState = this.state

    newState['emoji'] = card.emoji
    newState['text'] = card.text

    this.setState(newState)
  }

  onInputEdit = (event) => {
    let updatedInput = this.state;

    updatedInput[event.target.name] = event.target.value;

    this.setState(updatedInput);
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);

    this.props.updateCardCallback(this.state, this.props.index)

    const resetState = {
      emoji: '',
      text: ''
    }
    this.setState = (resetState);
    this.forceUpdate()
  }

  render() {
    const selectEmoji = EMOJI_LIST.map((emoji1, index) => {
      return <option key={index }value={emoji1}>{emoji.getUnicode(emoji1)}</option>
    })

    return (
      <article className="update-card">
      <section className="update-card__content">
          <article>
          <select className="update-card-form__form-select" name="emoji" value={this.state.emoji} onChange={this.onInputEdit}>
            {selectEmoji}
          </select>
          </article>
          <article>
            <textarea
            rows="5"
              type="text"
              className="update-card__content-text"
              name="text" value={this.state.text} onChange={this.onInputChange} />
          </article>
            <button className="update-card-form__form-button" onClick={this.onFormSubmit}>Update Card</button>
        </section>
        </article>
      )
    }
  }
