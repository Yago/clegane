/*
  Main
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTmdbItems } from '../../actions/tmdb';

class Main extends React.Component {
  componentWillMount() {
    this.props.getTmdbItems('movie/popular', 1);
  }

  render() {
    const movies = this.props.tmdb.map((movie, key) => {
      return (
        <div key={key}>
          <h3>{movie.title}</h3>
          <em>{movie.release_date}</em>
        </div>
      );
    });

    return (
      <div>
        <h1>Popular movies</h1>
        {movies}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tmdb: state.tmdb
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({getTmdbItems}, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Main);
