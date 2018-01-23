/*global FHIR*/

import React, { Component } from 'react';
import ResourceListItem from './ResourceListItem';

class ResourceList extends Component {
  
  render() {
    const results = this.props.results;
    const children = this.props.children;
    if(results.length == 0) { return false; }
    return (
      <ul className="resource-list"> 
        {results.map((item) => {
          const resource = item.resource;
          return (
            <ResourceListItem resource={resource} />
          )
        })}
      </ul>
    )
  }
}

export default ResourceList;