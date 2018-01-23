import expect from 'expect'
import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import {renderToStaticMarkup as render} from 'react-dom/server'
import LoadingSpinner from 'src/LoadingSpinner'
import ResourceListItem from 'src/ResourceListItem'
import { SmartRead, SmartSearch, ResourceList } from 'src/'

describe('LoadingSpinner', () => {
  it('renders a div with class="loading-spinner"', () => {
    expect(render(<LoadingSpinner />))
      .toContain('<div class="loading-spinner"></div>')
  })
})

describe('SmartRead', () => {
  it('Passes resource data from FHIR query to child as props', () => {
    // Need to pretend FHIR is assiged to window.FHIR since that's where
    // the SMART on FHIR library sets it.
    window.FHIR = mockFhir();
    const renderer = new ShallowRenderer();
    renderer.render(<SmartRead query={{ type: 'Patient' }}><LoadingSpinner /></SmartRead>);
    const result = renderer.getRenderOutput();
    expect(result.props.children).toEqual(
      <LoadingSpinner resource={{ resourceType: 'Patient' }} />
    );
  })
})

describe('SmartSearch', () => {
  it('Passes an array of resources from FHIR query to child as props', () => {
    // Need to pretend FHIR is assiged to window.FHIR since that's where
    // the SMART on FHIR library sets it.
    window.FHIR = mockFhir();
    const renderer = new ShallowRenderer();
    renderer.render(<SmartSearch query={{ type: 'Patient' }}><LoadingSpinner /></SmartSearch>);
    const result = renderer.getRenderOutput();
    expect(result.props.children).toEqual(
      <LoadingSpinner results={[ { resource: { id: 1, resourceType: 'Patient' } }, { resource: { id:2, resourceType: 'Patient' } } ]} />
    );
  })
})

describe('ResourceList', () => {
  it('Takes in an array of resources and renders a ResourceListItem for each, passing in the resource data as a prop', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <ResourceList results={[ { resource: { id: 1, resourceType: 'Patient' } }, { resource: { id:2, resourceType: 'Patient' } } ]}>
        <LoadingSpinner />
      </ResourceList>
    );
    const result = renderer.getRenderOutput();
    expect(result.props.children).toEqual([
      <ResourceListItem resource={{ id: 1, resourceType: 'Patient' }} />,
      <ResourceListItem resource={{ id: 2, resourceType: 'Patient' }} />
    ]);
  })
})

describe('ResourceListItem', () => {
  it('Takes in resource data as a prop and renders of clone of its children, passing them the resource data as a prop', () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <ResourceListItem resource={{ id: 1, resourceType: 'Patient' }}>
        <LoadingSpinner />
        <LoadingSpinner />
      </ResourceListItem>
    );
    const result = renderer.getRenderOutput();
    expect(result.props.children).toEqual([
      <LoadingSpinner key='.0' resource={{ id: 1, resourceType: 'Patient' }} />,
      <LoadingSpinner key='.1' resource={{ id: 1, resourceType: 'Patient' }} />
    ]);
  })
})


/****************************************************
 * 
 * Mocks below
 * 
 ****************************************************/

function mockFhir() {
  const fhir = {
    oauth2: {
      ready: function(callback) {
        const smart = mockSmart();
        callback(smart);
      }
    }
  }
  return fhir;
}

function mockSmart() {
  const smart = {
    api: {
      read: function(query) {
        return {
          done: function(updateResultsCallback) {
            const results = {
              data: { resourceType: query.type }
            }
            updateResultsCallback(results);
          }
        }
      },
      search: function(query) {
        return {
          done: function(updateResultsCallback) {
            const results = {
              data: {
                entry: [
                  {
                    resource : { 
                      id: 1, 
                      resourceType: query.type 
                    }
                  },
                  {
                    resource : { 
                      id: 2, 
                      resourceType: query.type 
                    }
                  }
                ]
              }
            }
            updateResultsCallback(results);
          }
        }
      }
    }
  }
  return smart;
}