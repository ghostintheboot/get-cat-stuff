import React from 'react';
import ReactDOM from 'react-dom';
import Header from './getcatstuffcomponents/Header';
import Robot from './getcatstuffcomponents/Robot';
import GameResults from './getcatstuffcomponents/GameResults';
import DecisionButtons from './getcatstuffcomponents/DecisionButtons';
import randomCatText from './cattext';
import {randomCatEmoticon, getRandomRotationAngle} from './utils';
import './getcatstuffstyle.css';
import './mediaqueries.css';

// Framer Motion library
import { motion } from 'framer-motion';

// UI fx
import UIfx from 'uifx';
import rightSound from './sound/Robot_blip-Marianne_Gagnon-120342607.mp3';
import wrongSound from './sound/Computer Error-SoundBible.com-399240903.mp3';
import retrySound from './sound/Button-SoundBible.com-1420500901.mp3';


class GuessingGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guessText: '',
      isCorrect: null,
      isLeft: false,
      isNeutral: true,
      isRight: false,
      leftOrRight: null,
      numberOfLosses: 0,
      numberOfWins: 0,
      showJSONdata: null,
      totalGames: 0,
    }
    this.handleReset = this.handleReset.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
  }


  get initialState() {
    return {
      guessText: '',
      isCorrect: null,
      isLeft: false,
      isNeutral: true,
      isRight: false,
      leftOrRight: null,
      showJSONdata: null,
    };
  }


  handleReset() {
    // 'Reset' sound.
    const neutralBeep = new UIfx(
      retrySound,
      {
        volume: 0.1, // number between 0.0 ~ 1.0
        throttleMs: 50
      }
    );
    neutralBeep.play();
    this.setState(this.initialState);
  }


  handleLeftClick() {
    Object.assign(this.state, { isNeutral: false, leftOrRight: 0 });
    this.handleCoinFlip();
  }


  handleRightClick() {
    Object.assign(this.state, { isNeutral: false, leftOrRight: 1 });
    this.handleCoinFlip();
  }


  handleJSON() {
    Object.assign(this.state, { showJSONdata: true });

    // Fetch Cat Image
    const url = 'https://aws.random.cat/meow';
    fetch(url)
    .then( response => response.json() )
    .then( function(data) {
      let cat = document.querySelector(".display-image");
      cat.innerHTML = `<img src="${data.file}" alt="cute cat picture" class="cat-image" />`;
    })
    .catch( function(error) {
      let noCat = document.querySelector(".display-image");
      noCat.style.color = 'red'; // Red text.
      noCat.innerHTML = 'Failed API fetch for image.';
      // console.error('Error: ', error)
    });

    /*
    // Fetch Cat Fact
    // I decided to use an array instead of the API, because the cat-fact app 400s too much :/
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const facts = 'https://cat-fact.herokuapp.com/facts/random';
    fetch(proxyurl + facts)
    .then( resp => resp.json() )
    .then(function(data) {
      let target = document.getElementById("display-fact");
      target.innerHTML = `${data.text}`;
    });
    */
  }


  handleCoinFlip() {
    let coinFlip = Math.round( Math.random() );
    // let coinFlip = 1; // For testing purposes.

    if (coinFlip === 0) {
      this.setState({
        isLeft: true,
        isRight: false,
      });
    } else {
      this.setState({
        isLeft: false,
        isRight: true,
      });
    }

    if (coinFlip === this.state.leftOrRight) {
      this.setState({
        isCorrect: true,
        guessText: 'You guessed correctly!',
      });
      this.setState( prevState => ({
        numberOfWins: prevState.numberOfWins + 1
      }));
      this.handleJSON();

      // 'Correct Guess' sound.
      const goodBeep = new UIfx(
        rightSound,
        {
          volume: 0.1, // number between 0.0 ~ 1.0
          throttleMs: 50
        }
      );
      goodBeep.play();
    } else {
      this.setState({
        guessText: 'Incorrect guess.',
        isCorrect: false,
        showJSONdata: true,
      });
      this.setState( prevState => ({
        numberOfLosses: prevState.numberOfLosses + 1
      }));
      // 'Incorrect Guess' sound.
      const badBeep = new UIfx(
        wrongSound,
        {
          volume: 0.15,
          throttleMs: 50
        }
      );
      badBeep.play();
    }

    // Add to total number of games regardless of a win or loss.
    this.setState( prevState => ({
      totalGames: prevState.totalGames + 1
    }));
  }


  render() {
    const precursorStyle = {};
    const displayStyle = {};

    if (this.state.showJSONdata === null) {
      precursorStyle.background = 'linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))'
    }
    if (this.state.showJSONdata) {
      displayStyle.background = 'linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9))'
    }

    let catConditionalRender = null;
    if (this.state.isCorrect === null) {
      catConditionalRender = (
        <div>
          <p className="precursor-image-text">Guess right and a cat pic will appear!</p>
          <p style={precursorStyle} className="precursor-fact-text">A cat fact will go here!</p>
        </div>
      )
    } else if (this.state.isCorrect === true) {
      catConditionalRender = (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <div className="display-image move-left-image"></div>
          <div style={displayStyle} className="display-fact move-left-fact">{randomCatText()}</div>
        </motion.div>
      )
    } else {
      catConditionalRender = (
        <motion.div
          className="display-consolation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: getRandomRotationAngle(-10, 10) }}
          transition={{ duration: 1.2 }}
        >
          <p>no kitty 4 u  :(</p>
          <p>...But you can have this consolation prize: a random cat emoticon.</p>
          <h1>{randomCatEmoticon()}</h1>
        </motion.div>
      )
    }

    let guessConditionalRender = null;
    if (this.state.isLeft) {
      guessConditionalRender = (
        <React.Fragment>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 10 }}
            transition={{ delay: 0.1, duration: 0.75 }}
          ><span className="left-choice">LEFT!</span> <em>{this.state.guessText}</em></motion.p>
        </React.Fragment>
      )
    } else if (this.state.isRight) {
      guessConditionalRender = (
        <React.Fragment>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 10 }}
            transition={{ delay: 0.1, duration: 0.75 }}
          ><span className="right-choice">RIGHT!</span> <em>{this.state.guessText}</em></motion.p>
        </React.Fragment>
      )
    }

    return (
      <motion.div
        className="container"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Header />

        <hr></hr>

        <div className="row">
          <Robot {...this.state} />
          <div className="col">
            {catConditionalRender}
          </div>
        </div>

        <hr></hr>

        <div className="results-section">
          <div className="guess-results">
            <p><em>Robot chose...</em></p>
            {guessConditionalRender}
          </div>
          <GameResults
            wins={this.state.numberOfWins}
            losses={this.state.numberOfLosses}
            total={this.state.totalGames}
          />
        </div>

        <DecisionButtons
          showjsondata={this.state.showJSONdata}
          left={this.handleLeftClick}
          right={this.handleRightClick}
          reset={this.handleReset}
        />
      </motion.div>
    );
  }
}


const root = document.getElementById('root');
ReactDOM.render(<GuessingGame />, root);