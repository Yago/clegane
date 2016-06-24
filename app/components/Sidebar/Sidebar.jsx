/*
  Sidebar
*/

import React from 'react';
import { Link } from 'react-router'
import Search from './Search.jsx';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-inner">
          <Link to={'/'} className="brand">
            <div className="icon icon-clegane"></div>
          </Link>
          <Search />
        </div>
      </div>
    );
  }
}

export default Sidebar;
