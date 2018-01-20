import React, {Component} from 'react'
import {render} from 'react-dom'
import {TestRead} from '../../src'

class PatientResource extends Component {
  
  render() {
    const patient = this.props.resource;
    const name = patient.name[0];
    const address = patient.address[0];
    return(
      <div>
        <h2>{ name.given[0] + ' ' + name.family }</h2>
        <div>{ address.line[0] }</div>
      </div>
    )
  }
  
}

class Demo extends Component {
  render() {
    return (
      <TestRead query={{ type: 'Patient', id: '0c458610-3570-4103-9263-ab84fbff6f0c'}}>
        <PatientResource />
      </TestRead>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
