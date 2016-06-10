import fetch from 'isomorphic-fetch';

import {
  IS_AUTH,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../actions/user';

function user(state = {}, action) {
  switch(action.type) {
    case IS_AUTH: {
      return Object.assign({}, state, {
        isAuth: true,
        displayName: action.data.displayName,
        email: action.data.email,
        photoURL: action.data.photoURL
      });
    }
    case LOGIN_SUCCESS: {
      console.log('res : ', action.res);
      return state;
    }
    case LOGIN_FAIL: {
      console.log('err : ', action.err);
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
      console.log('err : ', action.err);
      return state;
    }
    default: {
      return state;
    }
  }
}

export default user;
