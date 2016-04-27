import React from 'react'
import ReactDOM from 'react-dom'
import ColorPicker from './ColorPicker'

const socket = io()

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      color: '#FFFFFF'
    }

    this.handleColorChange = this.handleColorChange.bind(this)

    socket.on('color', (data) => {
      this.setState({
        color: data
      })
    })
  }

  handleColorChange(color) {
    socket.emit('color', color.hex)

    this.setState({
      color: color.hex
    })
  }

  handleWhiteOn(e) {
    e.preventDefault()
    socket.emit('control', 'on')
  }

  handleAllOff(e) {
    e.preventDefault()
    socket.emit('control', 'off')
  }

  render() {
    return (
      <div>
        <h1>Dunia Gemerlap 😺</h1>
        <ColorPicker color={this.state.color} onChange={this.handleColorChange} />
        <div className='controls'>
          <button className='btn btn-default' onClick={this.handleWhiteOn}>White On</button>&nbsp;
          <button className='btn btn-default' onClick={this.handleAllOff}>All Off</button>
        </div>
      </div>
    )
  }

}

export default HomePage
