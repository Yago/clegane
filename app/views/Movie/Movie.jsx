/*
  Movie
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import HeaderButtons from '../../components/HeaderButtons';
import MediaTeaser from '../../components/MediaTeaser';
import Pagination from '../../components/Pagination';

import { getTmdbItemData, cleanTmdbData } from '../../actions/tmdb';

class Movie extends React.Component {
  constructor() {
    super();
  }

  // Handle tmdb item call
  handleTmdbCalls() {
    const type = this.props.location.pathname.split('/')[1],
          currentId = this.props.params.id;

    this.props.getTmdbItemData(type, currentId);
  }

  componentWillMount() {
    this.handleTmdbCalls();
  }

  componentWillUnmount() {
    this.props.cleanTmdbData();
  }

  // componentWillReceiveProps(nextProps) {
  //   // Call new tmdb items call if the url change
  //   if (nextProps.location.pathname != this.state.current_path) {
  //     this.handleTmdbCalls();
  //   }
  // }

  render() {
    return (
      <div className="main-container">
        <h1>{this.props.tmdb.movie ? this.props.tmdb.movie.title : ''}</h1>
        <div className="spacer"></div>
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
    getTmdbItemData,
    cleanTmdbData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Movie);
