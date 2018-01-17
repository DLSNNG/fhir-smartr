# fhir-smartr

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

# SMART on FHIR Components for React

## Installation
### NPM
```
npm install --save fhir-smartr
```

### In the Browser (UMD)
```html
<script type="text/javascript" src="https://unpkg.com/fhir-smartr@1.0.0/umd/fhir-smartr.js"></script>
```

## Usage
### Reading a specific resource
```javascript
import React, { Component } from 'react';
import { SmartRead } from 'fhir-smartr'

// Define your resource component
class PatientResource extends Component {
  
  render() {
    // The results of your Smart query will be passed as the resource prop to this component
    const patient = this.props.resource;
    const name = patient.name[0];
    const address = patient.address[0];
    return(
      <h2>{ name.given[0] + ' ' + name.family }</h2>
      <div>{ address.line[0] }</div>
    )
  }
  
}

// Then use the resource component in your application
class App extends Component {
  render() {
    return (
      // SmartRead allows you to define a query, and then passes the results of that query (as the resource prop) to it's children
      <SmartRead query={{ type: 'Patient' id: 'some-id'}}>
        <PatientResource />
      </SmartRead>
    )
  }
}

ReactDOM.render(<PatientResource id="some-string" />, document.getElementById('root'));
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
