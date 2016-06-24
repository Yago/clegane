/*
  Search
*/

import React from 'react';
import { Link } from 'react-router';
import Main from '../Main';

class Search extends React.Component {
  render() {
    return (
      <div className="search">
        <input type="text" placeholder="Movie, TV Show, People,..." />
        <Link to={'/'} className="button button-main">
          <i className="icon icon-search"></i>
        </Link>
      </div>
    );
  }
}

export default Search;
