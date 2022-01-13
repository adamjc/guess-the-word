import React from 'react'

export class Letters extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div class="letters">
        <input type="text" className="character" minlength="1" maxlength="1" id="char-1"/>
        <input type="text" className="character" minlength="1" maxlength="1" id="char-2"/>
        <input type="text" className="character" minlength="1" maxlength="1" id="char-3"/>
        <input type="text" className="character" minlength="1" maxlength="1" id="char-4"/>
        <input type="text" className="character" minlength="1" maxlength="1" id="char-5"/>
      </div>
    )
  }
}