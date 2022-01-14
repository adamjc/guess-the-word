// TODO: Pass chars through to <Letters>

const React = require('react')
const ReactDOM = require('react-dom')

const { Letters } = require('./letters.js')
import pickWord from './words.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      word: pickWord(),
      words: {
        1: { correct: "", chars: "" },
        2: { correct: "", chars: "" },
        3: { correct: "", chars: "" },
        4: { correct: "", chars: "" },
        5: { correct: "", chars: "" },
        6: { correct: "", chars: "" }
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
    const currentLine = this.state.currentLine
    console.log(`currentLine: ${JSON.stringify(currentLine, null, 2)}`)
    console.log("correct:", this.state.words[currentLine])
    console.log(`this.state: ${JSON.stringify(this.state.words[1].correct, null, 2)}`)
    return (
      <div key={this.state.currentLine}>
        <Letters order="1" onCharacterChange={this.handleCharacterChange} correct={this.state.words[1].correct} disabled={this.state.currentLine === 1 ? false : true}/>
        <Letters order="2" onCharacterChange={this.handleCharacterChange} correct={this.state.words[2].correct} disabled={this.state.currentLine === 2 ? false : true}/>
        <Letters order="3" onCharacterChange={this.handleCharacterChange} correct={this.state.words[3].correct} disabled={this.state.currentLine === 3 ? false : true}/>
        <Letters order="4" onCharacterChange={this.handleCharacterChange} correct={this.state.words[4].correct} disabled={this.state.currentLine === 4 ? false : true}/>
        <Letters order="5" onCharacterChange={this.handleCharacterChange} correct={this.state.words[5].correct} disabled={this.state.currentLine === 5 ? false : true}/>
        <Letters order="6" onCharacterChange={this.handleCharacterChange} correct={this.state.words[6].correct} disabled={this.state.currentLine === 6 ? false : true}/>
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