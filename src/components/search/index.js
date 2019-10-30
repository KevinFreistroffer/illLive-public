import React, { Component } from 'react';
import * as SearchStyles from './styles.scss';

export class Search extends Component {
  render() {
    return (
      <div className="search view center-all" styles={SearchStyles}>
        <h1 className="view-title">Search</h1>
      </div>
    );
  }
}

export default Search;
