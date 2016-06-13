/*
  Main
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isauth, user } from '../../firebase.js';

import { getTmdbItems } from '../../actions/tmdb';
import { isAuth, login, logout } from '../../actions/user';

class Main extends React.Component {
  componentWillMount() {
    this.props.getTmdbItems('movie/popular', 1);
    this.props.isAuth();
  }

  handleAuth() {
    this.props.login();
  }

  handleLogout() {
    this.props.logout();
  }

  addMovie(id) {
    console.log(id);
  }

  render() {
    const movies = this.props.tmdb.map((movie, key) => {
      return (
        <div key={key}>
          <h3>{movie.title}</h3>
          <p><em>{movie.release_date}</em></p>
          <button onClick={this.addMovie.bind(this, movie.id)}>Add to list</button>
        </div>
      );
    });

    let button = (<button onClick={this.handleAuth.bind(this)}>login</button>);
    if (this.props.user.isAuth) {
      button = (<button onClick={this.handleLogout.bind(this)}>logout</button>);
    }

    return (
      <div>
        <h1>Popular movies</h1>
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
  return bindActionCreators({getTmdbItems, isAuth, login, logout}, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Main);
