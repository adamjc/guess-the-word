const React = require('react')
const ReactDOM = require('react-dom')

const { Letters } = require('./letters.js')
import pickWord from './words.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      word: pickWord(),
      letters: {
        1: []
      },
      currentLine: 1
    }

    console.log(`word is ${this.state.word}`)
  }

  handleCharacterChange = ({order, letters}) => {
    this.setState(state => {
      state.letters[order] = letters
    })
  }

  handleClick = () => {
    const currentLine = this.state.currentLine
    console.log(this.state.letters[currentLine].length)
    if (this.state.letters[currentLine].length !== 5) {
      return
    }

    console.log(this.state)
    
    if (this.state.word === this.state.letters[currentLine].join("")) {
      console.log("congratulations")
    } else {
      console.log(`you guessed ${this.state.letters[currentLine].join("")}`)
    }

    this.setState(state => ({currentLine: state.currentLine + 1}))
  }

  render () {
    return (
      <div>
        <Letters order="1" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 1 ? false : true}/>
        <Letters order="2" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 2 ? false : true}/>
        <Letters order="3" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 3 ? false : true}/>
        <Letters order="4" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 4 ? false : true}/>
        <Letters order="5" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 5 ? false : true}/>
        <Letters order="6" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 6 ? false : true}/>
        <button onClick={this.handleClick}>Go</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))