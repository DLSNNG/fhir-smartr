import React, { Component } from 'react';

class ResourceListItem extends Component {
  render() {
    const resource = this.props.resource;
    const children = this.props.children;
    return (
      <li className={resource.resourceType + "-resource-item"} key={resource.id}>
        {React.Children.map(children, child => {
            return React.cloneElement(child, {
              resource: resource
            })
        })}
      </li>
    )
  }
}

export default ResourceListItem;