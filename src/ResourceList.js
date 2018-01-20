/*global FHIR*/

import React, { Component } from 'react';

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
            <li className={resource.resourceType + "-resource-item"} key={item.resource.id}>
              {React.Children.map(children, child => {
                  return React.cloneElement(child, {
                    resource: resource
                  })
              })}
            </li>
          )
        })}
      </ul>
    )
  }
}

export default ResourceList;