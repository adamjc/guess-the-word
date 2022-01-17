import React from 'react'

export class Word extends React.Component {
  constructor (props) {
    super(props)
    this.state = { 
      order: props.order,
      chars: props.chars,
      correct: props.correct,
      inputs: new Array(5).fill(0).map(_ => React.createRef())
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    prevState.correct = nextProps.correct
    prevState.chars = nextProps.chars
    return prevState
  }

  componentDidUpdate (prevProps, prevState) {
    const charIndex = this.state.chars.length
    if (charIndex >= 0 && charIndex < prevState.inputs.length) {
      prevState.inputs[charIndex].current.focus()
    } else if (charIndex == 0) {
      prevState.inputs[charIndex].current.focus()
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

  handleKeyPress = (e) => {
    if (e.code === "Backspace") {
      const charIndex = e.target.attributes.data.value

      let chars
      if (charIndex == this.state.inputs.length - 1 && this.state.chars[charIndex]) { // last character
        chars = this.state.chars.slice(0, charIndex)
      } else {
        chars = this.state.chars.slice(0, charIndex - 1)
      }

      this.setState({
        chars
      })

      this.props.onCharacterChange({order: this.state.order, chars})
    }
  }  

  render () {
    return (
      <div className="letters">
        <input ref={this.state.inputs[0]} type="text" onKeyDown={this.handleKeyPress} value={this.props.chars[0] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[0]} data="0" minLength="1" maxLength="1" onChange={this.handleChange} autoFocus={this.props.focused} />
        <input ref={this.state.inputs[1]} type="text" onKeyDown={this.handleKeyPress} value={this.props.chars[1] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[1]} data="1" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input ref={this.state.inputs[2]} type="text" onKeyDown={this.handleKeyPress} value={this.props.chars[2] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[2]} data="2" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input ref={this.state.inputs[3]} type="text" onKeyDown={this.handleKeyPress} value={this.props.chars[3] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[3]} data="3" minLength="1" maxLength="1" onChange={this.handleChange}/>
        <input ref={this.state.inputs[4]} type="text" onKeyDown={this.handleKeyPress} value={this.props.chars[4] || ''} disabled={this.props.disabled} className={"character " + this.state.correct[4]} data="4" minLength="1" maxLength="1" onChange={this.handleChange}/>
      </div>
    )
  }
}