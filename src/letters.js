// TODO: How to make each letter uniquely identifiable re: cssClasses ?

import React from 'react'

export class Letters extends React.Component {
  constructor (props) {
    super(props)
    this.state = { order: this.props.order, letters: [] }
  }

  handleChange = (e) => {
    if (!e.target.value.match(/[a-zA-Z]/)) {
      e.target.value = ''
      return
    }

    const value = e.target.value.toUpperCase()
    const index = e.target.attributes.data.value
    this.setState(state => state.letters[index] = value)
    e.target.value = value

    this.props.onCharacterChange(this.state)
  }

  render () {
    return (
      <div className="letters">
        <input type="text" disabled={this.props.disabled} className="character" data="0" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className="character" data="1" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className="character" data="2" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className="character" data="3" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className="character" data="4" minLength="1" maxLength="1" onChange={this.handleChange}/>
      </div>
    )
  }
}