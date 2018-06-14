import React, { Component } from 'react';
import PropTypes from 'prop-types';
import emoji from 'emoji-dictionary';
import './NewCardForm.css';

const EMOJI_LIST = ["", "heart_eyes", "beer", "clap", "sparkling_heart", "heart_eyes_cat", "dog"]

export default class NewCardForm extends Component {

  static propTypes = {
    addCardCallback: PropTypes.func.isRequired
  }

  constructor() {
    super();

    this.state = {
      emoji: '',
      text: ''
    }
  }

  onInputChange = (event) => {
    let updatedInput = this.state;

    updatedInput[event.target.name] = event.target.value;

    this.setState(updatedInput);
  }

  onFormSubmit = (event) => {
    event.preventDefault();

    this.props.addCardCallback(this.state)
    let updateState = {};
    updateState = this.state;

    updateState['emoji'] = '';
    updateState['text'] = '';

    // inexplicably, this stopped working but directly assigning it fixed my bug
    // this.setState = ({
    //   emoji: '',
    //   text: ''
    // });
  }

  render() {
    const selectEmoji = EMOJI_LIST.map((emoji1, index) => {
      return <option key={index }value={emoji1}>{emoji.getUnicode(emoji1)}</option>
    })

    return (
      <section className="new-card-form">
        <header className="new-card-form__header">
          <h2>Add New Card</h2>
        </header>
        <form className="new-card-form__form" onSubmit={this.onFormSubmit} >
          <article>
          <label className="new-card-form__form-label"  htmlFor="emoji">Emoji: </label>
          <select className="new-card-form__form-select" name="emoji" value={this.state.emoji} onChange={this.onInputChange}>
            {selectEmoji}
          </select>
          </article>
          <article>
            <label className="new-card-form__form-label"  htmlFor="message">Message: </label>
            <input type="textarea" className="new-card-form__form-textarea"
              name="text" value={this.state.text} onChange={this.onInputChange} />
          </article>
            <input className="new-card-form__form-button" type="submit" value="Submit" />
          </form>
        </section>
      )
    }
  }
