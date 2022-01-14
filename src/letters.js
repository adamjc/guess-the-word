// TODO: How to make each letter uniquely identifiable re: cssClasses ?

import React from 'react'

export class Letters extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      order: this.props.order, 
      chars: [],
      correct: this.props.correct
    }
  }

  handleChange = (e) => {
    if (!e.target.value.match(/[a-zA-Z]/)) {
      e.target.value = ''
      return
    }

    const value = e.target.value.toUpperCase()
    const index = e.target.attributes.data.value
    this.setState(state => state.chars[index] = value)
    e.target.value = value

    this.props.onCharacterChange(this.state)
  }

  render () {
    console.log("hello", this.state)

    return (
      <div className="letters">
        <input type="text" disabled={this.props.disabled} className={"character " + this.state.correct[0]} data="0" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className={"character " + this.state.correct[1]} data="1" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className={"character " + this.state.correct[2]} data="2" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className={"character " + this.state.correct[3]} data="3" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" disabled={this.props.disabled} className={"character " + this.state.correct[4]} data="4" minLength="1" maxLength="1" onChange={this.handleChange}/>
      </div>
    )
  }
}