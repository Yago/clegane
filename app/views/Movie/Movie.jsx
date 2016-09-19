/*
  Movie
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getTmdbItemData, cleanTmdbData } from '../../actions/tmdb';

import Image from '../../components/Image';

class Movie extends React.Component {
  constructor() {
    super();

    this.state = {
      watched: false
    }
  }

  componentWillMount() {
    const type = this.props.location.pathname.split('/')[1],
          currentId = this.props.params.id;

    this.props.getTmdbItemData(type, currentId);
  }

  componentWillUnmount() {
    this.props.cleanTmdbData();
  }

  handleWatch() {
    this.setState({watched: !this.state.watched});
  }

  render() {
    const movie = this.props.tmdb.movie;

    if (movie) {
      return (
        <div className="main-container">
          <div className="cover-container">
            <Image
              src={movie.backdrop_path}
              size="5"
              class="img-responsive"
              alt={movie.title} />
            <div className="cover-content">
              <div className="detail-container">
                <div className="detail-aside">
                  <div className="detail-aside-inner">
                    <Image
                      src={movie.poster_path}
                      size="1"
                      class="img-responsive"
                      alt={movie.title} />
                  </div>
                </div>
                <div className="detail-heading">
                  <h3>
                    <button onClick={this.handleWatch.bind(this)}>
                      <span className={this.state.watched ? 'icon icon-eye' : 'icon icon-unwatched'}></span>
                    </button>
                    Movie
                  </h3>
                  <h1>{movie.title}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {return (<span></span>);}
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
