import { Component } from 'react'

const keys = [
  'Q', 'W', 'E', 'R', 'T', 'Y', 'U',
  'I', 'O', 'P', 'A', 'S', 'D', 'F',
  'G', 'H', 'J', 'K', 'L', 'Z', 'X',
  'C', 'V', 'B', 'N', 'M'
]

export default class Keyboard extends Component {
  constructor (props) {
    super(props)
  }

  handleClick = e => {
    this.props.updateInput(e.target.innerText)
  }

  render () {
    return (
      <div className="keyboard">
        {
          keys.map(key => {
            return <button key={key} className="key" onClick={this.handleClick}>{key}</button>
          })
        }
      </div>
      
    )
  }
}