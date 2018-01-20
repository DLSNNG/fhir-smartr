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
<script type="text/javascript" src="https://unpkg.com/fhir-smartr@1.0.0/umd/fhir-smartr.js"></script>
```

## Reading a specific resource
### Node
```javascript
import React, { Component } from 'react';
import { SmartRead } from 'fhir-smartr'

// Define your resource component
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

// Then use the resource component in your application
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

### In the Browser
```html
<!doctype html>
<html lang="en" ng-app>
  <head>
    <title>Chat Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script src="https://cdn.rawgit.com/smart-on-fhir/client-js/v0.1.8/dist/fhir-client.js"></script>
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/fhir-smartr/umd/fhir-smartr.js"></script>
    <style>
      body {
        padding-top: 60px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      var Component = React.Component;
      var TestRead = FhirSmartr.TestRead;
      var TestSearch = FhirSmartr.TestSearch;
      
      class PatientResource extends Component {
        
        render() {
          // The results of your Smart query will be passed as props.resource to this component
          const patient = this.props.resource;
          const name = patient.name[0];
          const address = patient.address[0];
          return(
            <div>
              <div>{name.given + ' ' + name.family}</div>
              <div>{address.city}</div>
            </div>
          )
        }
        
      }
      
      // Then use the resource component in your application
      class App extends Component {
        render() {
          return (
            <TestRead query={{ type: 'Patient', id: '04327b09-4d3a-4c8b-9959-83bc1b358203' }}>
              <PatientResource />
            </TestRead>
          )
        }
      }
      
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

## Searching for Resources
### Node
```javascript
import React, { Component } from 'react';
import { SmartSearch, ResourceList } from 'fhir-smartr'

// Define your resource component
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

// Then use the resource component in your application
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

### In the Browser
```html
<!doctype html>
<html lang="en" ng-app>
  <head>
    <title>Chat Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>
    <script src="https://cdn.rawgit.com/smart-on-fhir/client-js/v0.1.8/dist/fhir-client.js"></script>
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/fhir-smartr/umd/fhir-smartr.js"></script>
    <style>
      body {
        padding-top: 60px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
      var Component = React.Component;
      var TestRead = FhirSmartr.TestRead;
      var TestSearch = FhirSmartr.TestSearch;
      var ResourceList = FhirSmartr.ResourceList;
      
      class OrganizationResourceView extends Component {
        
        render() {
          // The results of your Smart query will be passed as props.resource to this component
          console.log(this.props);
          const org = this.props.resource;
          if(!org) {
            return <div>Organization not found.</div>
          }
          const type = org.resourceType;
          if(type != 'Organization') {
            return <div>Resource is not an organization</div>
          }
          const name = org.name;
          return(
            <div>
              <h3>{name}</h3>
              <div>{org.id}</div>
            </div>
          )
        }
        
      }
      
      class PatientResource extends Component {
        
        render() {
          // The results of your Smart query will be passed as props.resource to this component
          const patient = this.props.resource;
          const name = patient.name[0];
          const address = patient.address[0];
          return(
            <div>
              <div>{name.given + ' ' + name.family}</div>
              <div>{address.city}</div>
            </div>
          )
        }
        
      }
      
      // Then use the resource component in your application
      class App extends Component {
        render() {
          return (
            <TestSearch query={{ type: 'Patient' }}>
              <ResourceList>
                <PatientResource />
              </ResourceList>
            </TestSearch>
          )
        }
      }
      
      ReactDOM.render(
        <App />,
        document.getElementById('root')
      );
    </script>
  </body>
</html>

```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
