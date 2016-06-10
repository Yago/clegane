import firebase from '../firebase.js';


export const IS_AUTH = 'IS_AUTH';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';

export function isAuth() {
  return dispatch => firebase.auth().onAuthStateChanged(function(data) {
    if (data) { dispatch({ type: IS_AUTH, data }); }
  });
}

// login
export function login() {
  const provider = new firebase.auth.GoogleAuthProvider();

  return dispatch => firebase.auth().signInWithPopup(provider)
    .then(res => dispatch({ type: LOGIN_SUCCESS, res }))
    .catch(err => dispatch({ type: LOGIN_FAIL, err }));
}

export function logout() {
  return dispatch => firebase.auth().signOut()
    .then(res => dispatch({ type: LOGOUT_SUCCESS, res }))
    .catch(err => dispatch({ type: LOGOUT_FAIL, err }));
}
