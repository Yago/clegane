/*
  Main
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MediaTeaser from '../../components/MediaTeaser';

import { getTmdbItems } from '../../actions/tmdb';

class Main extends React.Component {
  componentWillMount() {
    this.props.getTmdbItems('movie/popular', 1);
  }

  renderMovies() {
    if (this.props.tmdb.items) {
      return Object.keys(this.props.tmdb.items).map((id, key) => {
        const movie = this.props.tmdb.items[id];
        return (<MediaTeaser key={key} media={movie} />);
      });
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1>Popular movies</h1>
        {this.renderMovies()}
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
  return bindActionCreators({
    getTmdbItems
  }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Main);
