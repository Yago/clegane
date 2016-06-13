import firebase from '../firebase.js';

import {
  AUTH_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ADD_MOVIE
} from '../actions/user';

function user(state = {}, action) {
  switch(action.type) {
    case AUTH_SUCCESS: {
      return Object.assign({}, state, action.user);
    }

    case LOGIN_FAIL: {
      console.error('ERROR @ login :', action.err); // eslint-disable-line no-console
      return state;
    }

    case LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isAuth: false,
        displayName: null,
        email: null,
        photoURL: null
      });
    }

    case LOGOUT_FAIL: {
      console.error('ERROR @ logout :', action.err); // eslint-disable-line no-console
      return state;
    }

    case ADD_MOVIE: {
      const movie = {
        id: action.tmdbId,
        title: action.title
      };

      // Update Firebase
      let updates = {};
      updates[`/movies/${action.tmdbId}`] = movie;
      firebase.database().ref(`users/${action.uid}`).update(updates);

      // Update State
      const user = Object.assign({}, state);
      user.movies[action.tmdbId] = movie;
      return user;
    }
    default: {
      return state;
    }
  }
}

export default user;
