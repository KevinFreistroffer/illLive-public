import React, { Component } from 'react';
import * as PageNotFoundStyles from './styles.scss';

/**
 * PageNotFound
 */
export const PageNotFound = props => {
  
    return (
      <div className="page-not-found view-with-padding flex center-all" styles={PageNotFoundStyles}>
        <h1>Sorry that page doesn't exist.</h1>
      </div>
    )
}

export default PageNotFound;
