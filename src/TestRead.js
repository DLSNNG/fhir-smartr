/*global FHIR*/

import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';

class TestRead extends Component {
    
  constructor(props) {
    super(props);
    this.updateResults = this.updateResults.bind(this);
    this.setState = this.setState.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    this.state = {
      ready: false,
      api: false,
      results: [],
    }
  }
  
  componentWillMount() {
    let smart = FHIR.client({
      serviceUrl: 'https://sb-fhir-dstu2.smarthealthit.org/api/smartdstu2/open',
      patientId: 'SMART-1137192'
    });
    console.log(smart);
    this.setState({ ready: true, api: smart.api });
  }
  
  componentDidMount() {
    const props = this.props;
    this.handleQuery(props);
  }
  
  componentWillUpdate(nextProps, nextState) {
    console.log("component updating");
    if(this.props.query !== nextProps.query) {
      this.setState({ ready: false });  
      this.handleQuery(nextProps);
    }
  }
  
  updateResults(results) {
    console.log(results);
    const resource = results.data ? results.data : false;
    this.setState({ resource: resource, ready: true });
  }
  
  handleQuery(props) {
    const query = props.query;
    console.log(props);
    if(query) {
        this.state.api.read(query).done(this.updateResults);
    }
    else {
      this.setState({
        ready: true,
        results: []
      })
    }
  }
  
  render() {
    console.log('smart read');
    if(this.state.ready) {
      return (
        <div>{React.cloneElement(this.props.children, { resource: this.state.resource })}</div>
      );
    }
    else {
      return <LoadingSpinner />
    }
  }
}

export default TestRead;