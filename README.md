# fhir-smartr

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# SMART on FHIR Components for React

## Installation
### Node
```
npm install --save fhir-smartr
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
  <script type="text/javascript" src="https://unpkg.com/fhir-smartr@1.0.0/umd/fhir-smartr.js"></script>
</head>
```

## Usage
### Define a resource component using react
```javascript
import { Component } from 'react' // var Component = React.Component; in browser

class PatientResource extends Component {
  
  render() {
    // The results of your Smart query will be passed as props.resource to this component
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
      // Note: SmartRead and SmartSearch depend on FHIR.Oauth.Ready()
      //       If you want to test against the open SMART DSTU Sandbox, 
      //       use TestRead and TestSearch. These will use FHIR.Client() instead.
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
        // Resource list loops through props.results
        // and renders a clone of its children for each result,
        // passing in result.resource as child.props.resource
        <ResourceList>
          <PatientResource />
        </ResourceList>
      </SmartSearch>
      // Note: SmartRead and SmartSearch depend on FHIR.Oauth.Ready()
      //       If you want to test against the open SMART DSTU Sandbox, 
      //       use TestRead and TestSearch. These will use FHIR.Client() instead.
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
