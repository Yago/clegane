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
      // Movie header buttons
      case 'movie': {

        const activeClass = {
          popular: list === 'popular' ? 'active' : '',
          now_playing: list === 'now_playing' ? 'active' : '',
          upcoming: list === 'upcoming' ? 'active' : ''
        };

        return (
          <div className="btn-group">
            <Link to={'/movie/popular/1'} className={`btn btn-default ${activeClass.popular}`}>Popular</Link>
            <Link to={'/movie/now_playing/1'} className={`btn btn-default ${activeClass.now_playing}`}>Now playing</Link>
            <Link to={'/movie/upcoming/1'} className={`btn btn-default ${activeClass.upcoming}`}>Upcoming</Link>
          </div>
        );
      }

      // TV Shows header buttons
      case 'tv': {

        const activeClass = {
          popular: list === 'popular' ? 'active' : '',
          latest: list === 'latest' ? 'active' : '',
          airing_today: list === 'airing_today' ? 'active' : '',
          on_the_air: list === 'on_the_air' ? 'active' : ''
        };

        return (
          <div className="btn-group">
            <Link to={'/tv/popular/1'} className={`btn btn-default ${activeClass.popular}`}>Popular TV Shows</Link>
            <Link to={'/tv/airing_today/1'} className={`btn btn-default ${activeClass.airing_today}`}>Airing today TV Shows</Link>
            <Link to={'/tv/on_the_air/1'} className={`btn btn-default ${activeClass.on_the_air}`}>On the Air TV Shows</Link>
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
