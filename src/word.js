import React from 'react'

export class Word extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      order: this.props.order,
      chars: this.props.chars,
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
    return (
      <div className="letters">
        <input type="text" value={this.props.chars[0] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[0]} data="0" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" value={this.props.chars[1] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[1]} data="1" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" value={this.props.chars[2] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[2]} data="2" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" value={this.props.chars[3] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[3]} data="3" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input type="text" value={this.props.chars[4] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[4]} data="4" minLength="1" maxLength="1" onChange={this.handleChange}/>
      </div>
    )
  }
}