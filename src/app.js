const React = require('react')
const ReactDOM = require('react-dom')

const { Letters } = require('./letters.js')
import pickWord from './words.js'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      word: pickWord(),
      letters: [],
      currentLine: 1
    }

    console.log(`word is ${this.state.word}`)
  }

  handleCharacterChange = ({order, letters}) => {
    console.log(this.state)
    this.setState(letters[order] = letters)
  }

  handleClick = () => {
    console.log(this.state)
    if (this.state.word === this.state.letters.join("")) {
      console.log("congratulations")
    } else {
      console.log(`you guessed ${this.state.letters.join("")}`)
    }

    this.setState(state => ({currentLine: state.currentLine + 1}))
  }

  render () {
    return (
      <div>
        <Letters order="1" onCharacterChange={this.handleCharacterChange} disabled={this.state.currentLine === 1 ? false : true}/>
        <button onClick={this.handleClick}>Go</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))