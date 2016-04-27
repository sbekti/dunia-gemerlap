import React from 'react'
import ReactDOM from 'react-dom'
import { ChromePicker } from 'react-color'

class ColorPicker extends React.Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(color) {
    this.props.onChange(color)
  }

  render() {
    return (
      <ChromePicker onChangeComplete={this.handleChange} />
    )
  }

}

export default ColorPicker
