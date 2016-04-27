import React from 'react'
import ReactDOM from 'react-dom'
import ColorPicker from './ColorPicker'

const socket = io()

class HomePage extends React.Component {

  constructor(props) {
    super(props)
  }

  handleChange(color) {
    socket.emit('color', color.hex)
  }

  render() {
    return (
      <div>
        <h1>Dunia Gemerlap 😺</h1>
        <ColorPicker onChange={this.handleChange} />
      </div>
    )
  }

}

export default HomePage
