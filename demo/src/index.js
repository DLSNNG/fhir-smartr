import React, {Component} from 'react'
import {render} from 'react-dom'

import Example from '../../src'

class Demo extends Component {
  render() {
    return <div>
      <h1>fhir-smartr Demo</h1>
    </div>
  }
}

render(<Demo/>, document.querySelector('#demo'))
