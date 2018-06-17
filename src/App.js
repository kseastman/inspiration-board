import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentBoard: 'kat',
      previousBoard: ''
    }
  }

  componentDidUpdate(prevState) {

    if (this.state.currentBoard !== prevState.currentBoard) {

      console.log(this.state);
    }

  }

  changeBoard = (board) => {

    let updateState = Object.assign({}, this.state);
    updateState['previousBoard'] = this.state.currentBoard;
    updateState['currentBoard'] = board.boardName;

    this.setState(updateState);
  }

  render() {
    return (
      <section>
        <header className="header">
          <h1 className="header__h1"><span className="header__text">Inspiration Board</span></h1>
        </header>
        <Board key=""
          url="https://inspiration-board.herokuapp.com/boards/"
          boardName={this.state.currentBoard}
          changeBoardCallback={this.changeBoard}
          />
      </section>
    );
  }
}

export default App;
