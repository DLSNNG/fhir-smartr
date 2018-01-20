/*global FHIR*/

import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner.js';

class TestSearch extends Component {
    
  constructor(props) {
    super(props);
    // Bind update results to this scope
    this.updateResults = this.updateResults.bind(this);
    this.setState = this.setState.bind(this);
    this.handleQuery = this.handleQuery.bind(this);
    // set initial state
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
    if(this.props.query !== nextProps.query) {
      this.setState({ ready: false });  
      this.handleQuery(nextProps);
    }
  }
  
  updateResults(results) {
    console.log(results);
    const newResults = results.data.entry ? results.data.entry : [];
    this.setState({ results: newResults, ready: true });
  }
  
  handleQuery(props) {
    const query = props.query;
    if(query) {
        this.state.api.search(query).done(this.updateResults);
    }
    else {
      this.setState({
        ready: true,
        results: []
      })
    }
  }
  
  render() {
    console.log('smart search');
    if(this.state.ready) {
      return (
        <div>{React.cloneElement(this.props.children, { results: this.state.results })}</div>
      );
    }
    else {
      return <LoadingSpinner />
    }
  }
}

export default TestSearch;