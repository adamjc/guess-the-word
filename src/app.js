// TODO: Store results in cookies
// TODO: Modal dialog box after each round
// TODO: Set word length
// TODO: Move cursor to next input when character has been entered
// TODO: Do CSS
// TODO: Host it
// TODO: Add keyboard

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

      const wins = localStorage.getItem('wins')
      localStorage.setItem('wins', wins + 1)
    } else if (currentLine === 6) {
      console.log("You failed")

      const losses = localStorage.getItem('losses')
      localStorage.setItem('losses', losses + 1)
    }

    this.setState(state => {
      state.words[currentLine].correct = calculateCorrectChars(state.word, state.words[currentLine].chars)
      state.currentLine = state.currentLine + 1

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
      currentLine: 1
    })
  }

  handleKeyDown = (e) => {
    if (e.code === "Enter") {
      this.handleClick()
    }
  }

  render () {
    return (
      <div key={this.state.currentLine} onKeyDown={this.handleKeyDown}>
        <Word focused={this.state.currentLine === 1 ? true : false} order="1" chars={this.state.words[1].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[1].correct} disabled={this.state.currentLine === 1 ? false : true}/>
        <Word focused={this.state.currentLine === 2 ? true : false} order="2" chars={this.state.words[2].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[2].correct} disabled={this.state.currentLine === 2 ? false : true}/>
        <Word focused={this.state.currentLine === 3 ? true : false} order="3" chars={this.state.words[3].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[3].correct} disabled={this.state.currentLine === 3 ? false : true}/>
        <Word focused={this.state.currentLine === 4 ? true : false} order="4" chars={this.state.words[4].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[4].correct} disabled={this.state.currentLine === 4 ? false : true}/>
        <Word focused={this.state.currentLine === 5 ? true : false} order="5" chars={this.state.words[5].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[5].correct} disabled={this.state.currentLine === 5 ? false : true}/>
        <Word focused={this.state.currentLine === 6 ? true : false} order="6" chars={this.state.words[6].chars} onCharacterChange={this.handleCharacterChange} correct={this.state.words[6].correct} disabled={this.state.currentLine === 6 ? false : true}/>
        <button disabled={this.state.currentLine > 6} onClick={this.handleClick}>Guess</button>
        <button onClick={this.handleReset}>⟲</button>
      </div>
    )
  }
}

function calculateCorrectChars (word, chars) {
  const correct = chars.map((char, index) => {
    if (word[index] === char) {
      return "G"
    } else if (word.includes(char)) {
      return "Y"
    } else {
      return "B"
    }
  })

  for (let i = 0; i < chars.length; i += 1) {
    
  }

  return correct.join("")
}

ReactDOM.render(<App />, document.getElementById('app'))