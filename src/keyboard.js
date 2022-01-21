import { Component } from 'react'


const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '←']
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
          rows.map(row => {
            return <div key={row} className="row">
              {
                row.map(key => {
                  let colour
                  if (this.props.charsEntered.length) {
                    const result = this.props.charsEntered.find(({ char }) => char === key)
                    
                    colour = result ? result.colour : "N"
                  }
                  return <button disabled={colour && colour === "B"} key={key} className={"key " + colour} onClick={this.handleClick}>{key}</button>
                })
              }
            </div>
          })
        }
        
      </div>
      
    )
  }
}