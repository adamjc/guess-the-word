// TODO: Sort out CSS reflow when info text appears...
// TODO: Add help modal
// TODO: Do CSS (colours)
// TODO: Set word length
// TODO: Store results in cookies

const React = require('react')
const ReactDOM = require('react-dom')

const { Word } = require('./word.js')
import { pickWord, words }  from './words.js'
import Keyboard from './keyboard.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      word: pickWord(),
      words: {
        1: { correct: "", chars: [] },
        2: { correct: "", chars: [] },
        3: { correct: "", chars: [] },
        4: { correct: "", chars: [] },
        5: { correct: "", chars: [] },
        6: { correct: "", chars: [] }
      },
      charsEntered: [],
      currentLine: 1,
      gameEnd: false
    }

    console.log(`word is ${this.state.word}`)
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  handleClick = () => {
    const currentLine = this.state.currentLine
    
    if (this.state.gameEnd) {
      return
    }

    if (this.state.words[currentLine].chars.length !== 5) {
      return
    }

    const guess = this.state.words[currentLine].chars.join("")
    if (!words.includes(guess.toLowerCase())) {
      this.setState(({badGuess: true}))
      return 
    }

    this.setState(({badGuess: false}))
    
    if (this.state.word === guess) {
      console.log("congratulations")
      this.setState(state => {
        state.currentLine = 0
        return state
      })

      const wins = localStorage.getItem('wins')
      localStorage.setItem('wins', Number(wins) + 1)
    } else if (currentLine === 6) {
      console.log("You failed")
      this.setState({ gameEnd: true })

      const losses = localStorage.getItem('losses')
      localStorage.setItem('losses', Number(losses) + 1)
    }

    this.setState(state => {
      state.words[currentLine].correct = calculateCorrectChars(state.word, state.words[currentLine].chars)
      state.currentLine = state.currentLine + 1
      const correctChars = calculateCorrectCharsObj(state.word, state.words[currentLine].chars)
      state.charsEntered = state.charsEntered.concat(correctChars).sort(greenFirst).filter(removeDupes)
      return state
    })
  }

  handleReset = () => {
    const word = pickWord()
    console.log(`word is ${word}`)
    this.setState({
      word,
      words: {
        1: { correct: "", chars: [] },
        2: { correct: "", chars: [] },
        3: { correct: "", chars: [] },
        4: { correct: "", chars: [] },
        5: { correct: "", chars: [] },
        6: { correct: "", chars: [] }
      },
      currentLine: 1,
      charsEntered: [],
      gameEnd: false
    })
  }

  handleKeyboardInput = char => {
    this.handleKeyDown({ key: char })
  }

  handleKeyDown = (e) => {
    const char = e.key.toUpperCase()
    if (char === "ENTER") {
      this.handleClick()
      return
    }

    const currentLine = this.state.currentLine
    if (char === "BACKSPACE" || char === "←") {
      this.setState(state => {
        state.words[currentLine].chars = state.words[currentLine].chars.slice(0, state.words[currentLine].chars.length - 1)

        return state
      })

      return
    }

    const alphabetChar = /^[a-zA-Z]{1}$/
    if (!char.match(alphabetChar)) {
      return
    }
    
    const chars = this.state.words[currentLine].chars.concat(char).slice(0, 5)
    this.setState(state => {
      state.words[currentLine].chars = chars

      return state
    })
  }

  render () {
    return (
      <div key={this.state.currentLine}>
        <div className="words-list">
          <Word order="1" chars={this.state.words[1].chars} correct={this.state.words[1].correct}/>
          <Word order="2" chars={this.state.words[2].chars} correct={this.state.words[2].correct}/>
          <Word order="3" chars={this.state.words[3].chars} correct={this.state.words[3].correct}/>
          <Word order="4" chars={this.state.words[4].chars} correct={this.state.words[4].correct}/>
          <Word order="5" chars={this.state.words[5].chars} correct={this.state.words[5].correct}/>
          <Word order="6" chars={this.state.words[6].chars} correct={this.state.words[6].correct}/>
        </div>
        {this.state.badGuess ? <div className="info">Word not in word list</div> : ''}
        {this.state.gameEnd ? <div className="info">Word was {this.state.word}, better luck next time!</div>: ''}
        <div className="input">
          <Keyboard charsEntered={this.state.charsEntered} updateInput={this.handleKeyboardInput}></Keyboard>
          <div className="guess_new-game flex">
            <button className="guess key" onClick={this.handleClick}>Guess</button>
            <button className="new-game key" onClick={this.handleReset}>New Game</button>
          </div>
        </div>
      </div>
    )
  }
}

function greenFirst (a, b) {
  if (a.colour === "G" && b.colour !== "G") {
    return -1
  } 

  if (a.colour !== "G" && b.colour === "G") {
    return 1
  }

  return a.char - b.char
}

function removeDupes (value, index, array) {
  return index === array.findIndex(i => i.char === value.char)
}

function isCorrectChar (word) {
  return (char, index) => {
    if (word[index] === char) {
      return "G"
    } else if (word.includes(char)) {
      return "Y"
    }
  
    return "B"
  }
}

function calculateCorrectCharsObj (word, chars) {
  const correct = chars.map((char, index) => {
    const colour = isCorrectChar(word)(char, index)
    return {
      char,
      colour
    }
  })

  return correct
}

function calculateCorrectChars (word, chars) {
  const correct = chars.map(isCorrectChar(word))

  return correct.join("")
}

ReactDOM.render(<App />, document.getElementById('app'))
