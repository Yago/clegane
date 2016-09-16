/*
  HeaderButtons
*/

import React from 'react';
import { Link } from 'react-router';

class HeaderButtons extends React.Component {
  constructor() {
    super();
  }

  render() {
    const type = this.props.query.split('/')[0],
          list = this.props.query.split('/')[1];

    switch (type) {
      case 'movie': {

        const activeClass = {
          popular: list === 'popular' ? 'active' : '',
          now_playing: list === 'now_playing' ? 'active' : '',
          upcoming: list === 'upcoming' ? 'active' : ''
        }

        return (
          <div className="btn-group">
            <Link to={'/movie/popular/1'} className={`btn btn-default ${activeClass.popular}`}>Popular</Link>
            <Link to={'/movie/now_playing/1'} className={`btn btn-default ${activeClass.now_playing}`}>Now playing</Link>
            <Link to={'/movie/upcoming/1'} className={`btn btn-default ${activeClass.upcoming}`}>Upcoming</Link>
          </div>
        );
      }
      default: {
        return (<span></span>);
      }
    }
  }
}

export default HeaderButtons;
