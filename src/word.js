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
        <div className={"character " + this.state.correct[0]} data="0">{this.props.chars[0] || ''}</div>
        <div className={"character " + this.state.correct[1]} data="1">{this.props.chars[1] || ''} </div>
        <div className={"character " + this.state.correct[2]} data="2">{this.props.chars[2] || ''} </div>
        <div className={"character " + this.state.correct[3]} data="3">{this.props.chars[3] || ''}</div>
        <div className={"character " + this.state.correct[4]} data="4">{this.props.chars[4] || ''}</div>
      </div>
    )
  }
}