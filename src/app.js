// TODO: Set word length
// TODO: Do CSS (colours)

const React = require('react')
const ReactDOM = require('react-dom')

const { Word } = require('./word.js')
import { pickWord, words }  from './words.js'
import Keyboard from './keyboard.js'

let size = [5, 6]

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      word: pickWord(5),
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
      gameEnd: false,
      size: 5
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

    if (this.state.words[currentLine].chars.length !== this.state.size) {
      return
    }

    const guess = this.state.words[currentLine].chars.join("")
    if (!words[this.state.size].includes(guess.toLowerCase())) {
      this.setState({ badGuess: true })
      return 
    }

    this.setState({ badGuess: false })
    
    if (this.state.word === guess) {
      this.setState({ currentLine: 0 })
    } else if (currentLine === 6) {
      this.setState({ gameEnd: true })
    }

    this.setState(state => {
      state.words[currentLine].correct = calculateCorrectChars(state.word, state.words[currentLine].chars)
      state.currentLine = state.currentLine + 1
      const correctChars = calculateCorrectCharsObj(state.word, state.words[currentLine].chars)
      state.charsEntered = state.charsEntered.concat(correctChars).sort(greenFirst).filter(removeDupes)
      return state
    })
  }

  reset = size => {
    const word = pickWord(size)
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

  handleReset = _ => {
    this.reset(this.state.size)
  }

  changeSize = _ => {
    const currentSize = this.state.size
    const i = (size.indexOf(currentSize) + 1) % size.length
    this.setState({size: size[i]})
    this.reset(size[i])
  }

  handleKeyboardInput = char => {
    this.handleKeyDown({ key: char })
  }

  handleKeyDown = (e) => {
    const char = e.key.toUpperCase()
    if (char === "ENTER" || char === "⏎") {
      this.handleClick()
      return
    }

    const currentLine = this.state.currentLine
    if (char === "BACKSPACE" || char === "⌫") {
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
    
    const chars = this.state.words[currentLine].chars.concat(char).slice(0, this.state.size)
    this.setState(state => {
      state.words[currentLine].chars = chars

      return state
    })
  }

  render () {
    let words = []
    for (let i = 1; i <= 6; i++) {
      words.push(<Word key={i} size={this.state.size} order={i} chars={this.state.words[i].chars} correct={this.state.words[i].correct}></Word>)
    }

    return (
      <div className="app-container" key={this.state.currentLine}>
        <header>
          <button className="size key" onClick={this.changeSize}>{this.state.size}</button>
          <h1>Guess The Word</h1>
          <button className="new-game key" onClick={this.handleReset}>⟲</button>
        </header>
        <div className="game">
          <div className="words-list">{words}</div>
          {this.state.badGuess ? <div className="info">Word not in word list</div> : ''}
          {this.state.gameEnd ? <div className="info">Word was {this.state.word}, better luck next time!</div>: ''}
          <Keyboard charsEntered={this.state.charsEntered} updateInput={this.handleKeyboardInput}></Keyboard>
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
