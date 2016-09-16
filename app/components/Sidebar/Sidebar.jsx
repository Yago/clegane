/*
  Sidebar
*/

import React from 'react';
import { Link } from 'react-router';
import Search from '../Search';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-inner">
          <Link to={'/'} className="brand">
            <div className="icon icon-clegane"></div>
          </Link>

          <Search />

          <div className="sidebar-nav">
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-gauge"></i> Dashboard
            </Link>

            <h5>Discover</h5>
            <Link to={'/movie/popular/1'} className="link-iconed">
              <i className="icon icon-film"></i> Movies
            </Link>
            <Link to={'/tv/popular/1'} className="link-iconed">
              <i className="icon icon-television"></i> TV Shows
            </Link>
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-oscar"></i> People
            </Link>

            <h5>Personnal</h5>
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-eye"></i> Watched
            </Link>
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-star"></i> My lists
            </Link>
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-cog"></i> Settings
            </Link>
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-out"></i> Logout
            </Link>

            <h5>Clegane</h5>
            <Link to={'#'} className="link-iconed">
              <i className="icon icon-info"></i> About
            </Link>
          </div>

        </div>
      </div>
    );
  }
}

export default Sidebar;
