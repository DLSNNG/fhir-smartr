/*global FHIR*/

import React, { Component } from 'react';
import LoadingSpinner from './LoadingSpinner';

class SmartRead extends Component {
    
  constructor(props) {
    super(props);
    this.updateResults = this.updateResults.bind(this);
    this.state = {
      ready: false,
      api: false,
      results: [],
    }
  }
  
  componentWillMount() {
    const self = this;
    FHIR.oauth2.ready(function(smart) {
      console.log(smart);
      self.setState({ ready: true, api: smart.api });
      self.handleQuery(self.props);
    });
  }
  
  componentWillUpdate(nextProps, nextState) {
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

export default SmartRead;