/*
  Discover
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MediaTeaser from '../../components/MediaTeaser';
import Pagination from '../../components/Pagination';

import { getTmdbItems } from '../../actions/tmdb';

class Discover extends React.Component {
  constructor() {
    super();

    this.state = {
      current_path: '',
      query: '',
      page: ''
    };
  }

  handleTmdbItemsCall() {
    const currentPath = this.props.location.pathname.split('/'),
          query = `${currentPath[1]}/${currentPath[2]}`,
          page = this.props.params.page;

    // Update state
    this.setState({
      current_path: this.props.location.pathname,
      query,
      page
    });

    // Call for tmdb items
    this.props.getTmdbItems(query, page);
  }

  componentWillMount() {
    this.handleTmdbItemsCall();
  }

  componentWillUpdate(nextProps, nextState) {
    // New tmdb items call if the url change
    if (nextProps.location.pathname != this.state.current_path) {
      this.handleTmdbItemsCall();
    }
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
        <div className="media-grid">
          {this.renderMovies()}
        </div>
        <div className="spacer"></div>
        <div className="text-center">
          <Pagination page={this.state.page} query={this.state.query} total={this.props.tmdb.total_pages} />
        </div>
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
    getTmdbItems
  }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Discover);
