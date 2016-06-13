/*
  Main
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isauth, user } from '../../firebase.js';

import { getTmdbItems } from '../../actions/tmdb';
import { isAuth, login, logout, addMovie } from '../../actions/user';

class Main extends React.Component {
  componentWillMount() {
    this.props.getTmdbItems('movie/popular', 1);
    this.props.isAuth();
  }

  handleAuth() {
    this.props.login();
  }

  handleLogout() {
    this.props.logout(this.props.user.uid);
  }

  addMovieHandler(uid, title, tmdbId) {
    this.props.addMovie(uid, title, tmdbId);
  }

  render() {
    const movies = this.props.tmdb.map((movie, key) => {
      return (
        <div key={key}>
          <h3>{movie.title}</h3>
          <p><em>{movie.release_date}</em></p>
          <button onClick={this.addMovieHandler.bind(this, this.props.user.uid, movie.title, movie.id)}>Add to list</button>
        </div>
      );
    });

    let userMovies = (<span>nothing here</span>);
    if (this.props.user.movies) {
      userMovies = Object.keys(this.props.user.movies).map((movie, key) => {
        return (
          <span key={key}>
            <span>{this.props.user.movies[movie].title} - {this.props.user.movies[movie].id}</span>
            <br/>
          </span>
        );
      });
    }

    let button = (<button onClick={this.handleAuth.bind(this)}>login</button>);
    if (this.props.user.isAuth) {
      button = (<button onClick={this.handleLogout.bind(this)}>logout</button>);
    }

    return (
      <div>
        <h1>Popular movies</h1>
        <pre>{userMovies}</pre>
        {button}
        {movies}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tmdb: state.tmdb,
    user: state.user
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({
    getTmdbItems,
    isAuth,
    login,
    logout,
    addMovie
  }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Main);
