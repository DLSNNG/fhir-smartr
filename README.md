# fhir-smartr

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/DLSNNG/fhir-smartr/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/fhir-smartr)

# SMART on FHIR Components for React
Example on Plunker: [https://plnkr.co/edit/YYdAIdKY2VW9UbF6GT0X](https://plnkr.co/edit/YYdAIdKY2VW9UbF6GT0X?p=preview)

See also [fhir-smartr-redux](https://github.com/DLSNNG/fhir-smartr-redux) for modified implementation using Redux.

## Installation
### Node
```
npm install --save fhir-smartr
```
Make sure to include a reference to the SMART on FHIR js library in your <head> so we have access to the API.
```html
<script src="https://cdn.rawgit.com/smart-on-fhir/client-js/v0.1.8/dist/fhir-client.js"></script>
```

### In the Browser (UMD)
```html
<head>
  <!--Load dependencies -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
  <script src="https://cdn.rawgit.com/smart-on-fhir/client-js/v0.1.8/dist/fhir-client.js"></script>
  <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
  <!-- Load fhir-smartr -->
  <script type="text/javascript" src="https://unpkg.com/fhir-smartr/umd/fhir-smartr.min.js"></script>
</head>
```

## Usage
### Define a resource component with React
```javascript
import { Component } from 'react' // var Component = React.Component; in browser

class PatientResource extends Component {
  
  render() {
    // FHIR resources will be passed in as props.resource
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
```

### Read a FHIR resource
```javascript
import React, { Component } from 'react' // var Component = React.Component; in browser
import { SmartRead } from 'fhir-smartr' // var SmartRead = FhirSmartr.SmartRead in browser

class App extends Component {
  render() {
    return (
      // SmartRead allows you to define a query
      // The results of that query are then passed to its children as props.resource
      <SmartRead query={{ type: 'Patient', id: '0c458610-3570-4103-9263-ab84fbff6f0c'}}>
        <PatientResource />
      </SmartRead>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Search for a FHIR Resource
```javascript
import React, { Component } from 'react'
import { SmartSearch, ResourceList } from 'fhir-smartr' // FhirSmartr.SmartSearch and FhirSmartr.ResourceList in browser

class App extends Component {
  render() {
    return (
      // SmartSearch allows you to define a query
      // The results of that query are then passed to its children as props.results
      <SmartSearch query={{ type: 'Patient' }}>
        // ResourceList maps props.results to a list of its child components 
        <ResourceList>
          <PatientResource />
        </ResourceList>
      </SmartSearch>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```
**_Note_**: SmartRead and SmartSearch depend on FHIR.Oauth.Ready(). If you want to test against the open SMART DSTU Sandbox, use TestRead and TestSearch. These will use FHIR.Client() instead.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
