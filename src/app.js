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

    this.setState(state => ({currentLine: state.currentLine + 1}))
  }

  render () {
    const currentLine = this.state.currentLine
    console.log("correct:", this.state.words[currentLine].correct)
    return (
      <div>
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

ReactDOM.render(<App />, document.getElementById('app'))