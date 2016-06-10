/*
  Main
*/

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isauth, user } from '../../firebase.js';

import { getTmdbItems } from '../../actions/tmdb';
import { login, logout } from '../../actions/user';

class Main extends React.Component {
  componentWillMount() {
    this.props.getTmdbItems('movie/popular', 1);
    const localUser = `firebase:authUser:${localStorage.cleganeUser}:[DEFAULT]`;
    if (localStorage.getItem(localUser)) {
      console.log('Auth !');
    } else {
      console.log('No auth');
    }
  }

  handleAuth() {
    this.props.login();
  }

  handleLogout() {
    this.props.logout();
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

    let button = (<button onClick={this.handleAuth.bind(this)}>login</button>);
    if (isauth) {
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
    tmdb: state.tmdb
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({getTmdbItems, login, logout}, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(Main);
