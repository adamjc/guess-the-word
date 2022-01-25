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
    let letters = []
    for (let i = 0; i < this.props.size; i++) {
      letters.push(
        <div key={i} className={"character " + this.state.correct[i]} data={i}>{this.props.chars[i] || ''}</div>
      )
    }

    return (
      <div className="words">{letters}</div>
    )
  }
}