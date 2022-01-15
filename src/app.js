const React = require('react')
const ReactDOM = require('react-dom')

const { Word } = require('./word.js')
import pickWord from './words.js'

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
      currentLine: 1
    }

    console.log(`word is ${this.state.word}`)
  }

  handleCharacterChange = ({order, chars}) => {
    this.setState(state => {
      state.words[order].chars = chars

      return state
    })
  }

  handleClick = () => {
    const currentLine = this.state.currentLine
    if (this.state.words[currentLine].chars.length !== 5) {
      return
    }
    
    if (this.state.word === this.state.words[currentLine].chars.join("")) {
      console.log("congratulations")
      this.setState(state => {
        state.currentLine = 0
        return state
      })
    } else {
      console.log(`you guessed ${this.state.words[currentLine].chars.join("")}`)
    }

    this.setState(state => {
      state.words[currentLine].correct = calculateCorrectChars(state.word, state.words[currentLine].chars)
      state.currentLine = state.currentLine + 1

      return state
    })
  }

  render () {
    return (
      <div key={this.state.currentLine}>
        <Word order="1" chars={this.state.words[1].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[1].correct} disabled={this.state.currentLine === 1 ? false : true}/>
        <Word order="2" chars={this.state.words[2].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[2].correct} disabled={this.state.currentLine === 2 ? false : true}/>
        <Word order="3" chars={this.state.words[3].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[3].correct} disabled={this.state.currentLine === 3 ? false : true}/>
        <Word order="4" chars={this.state.words[4].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[4].correct} disabled={this.state.currentLine === 4 ? false : true}/>
        <Word order="5" chars={this.state.words[5].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[5].correct} disabled={this.state.currentLine === 5 ? false : true}/>
        <Word order="6" chars={this.state.words[6].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[6].correct} disabled={this.state.currentLine === 6 ? false : true}/>
        <button onClick={this.handleClick}>Go</button>
      </div>
    )
  }
}

function calculateCorrectChars (word, chars) {
  const correct = []

  for (let i = 0; i < chars.length; i += 1) {
    if (word[i] === chars[i]) {
      correct[i] = "G"
    } else if (word.includes(chars[i])) {
      correct[i] = "Y"
    } else {
      correct[i] = "B"
    }
  }

  return correct.join("")
}

ReactDOM.render(<App />, document.getElementById('app'))