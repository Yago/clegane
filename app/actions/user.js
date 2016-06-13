import firebase from '../firebase.js';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const ADD_MOVIE = 'ADD_MOVIE';

// Authenticate user
export function auth(user) {
  // Get data from user
  const {
    uid,
    displayName,
    email,
    photoURL
  } = user;

  // Create user default data
  const userDefault = {
    isAuth: true,
    uid,
    displayName,
    email,
    photoURL,
    movies: []
  };

  // Get user's data from Firebase and register default data if not exist
  const currentUser = firebase.database().ref(`users/${user.uid}`);
  return dispatch => currentUser.once('value')
    .then(res => {
      if (res.val()) {
        currentUser.update({isAuth: true});
        dispatch({ type: AUTH_SUCCESS, user: res.val() });
      } else {
        currentUser.set(userDefault);
        dispatch({ type: AUTH_SUCCESS, user: userDefault });
      }
    });
}

// Re-auth if already authenticated
export function isAuth() {
  return dispatch => firebase.auth().onAuthStateChanged(user => {
    if (user) { dispatch(auth(user)); }
  });
}

// login
export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return dispatch => firebase.auth().signInWithPopup(provider)
    .then(res => dispatch(auth(res.user)))
    .catch(err => dispatch({ type: LOGIN_FAIL, err }));
}

export function logout(uid) {
  firebase.database().ref(`users/${uid}`).update({isAuth: false});

  return dispatch => firebase.auth().signOut()
    .then(res => { dispatch({ type: LOGOUT_SUCCESS, res }); })
    .catch(err => dispatch({ type: LOGOUT_FAIL, err }));
}

export function addMovie(uid, title, tmdbId) {
  return {
    type: ADD_MOVIE,
    uid,
    title,
    tmdbId
  };
}
