import fetch from 'isomorphic-fetch';

import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL
} from '../actions/user';

function user(state = [], action) {
  switch(action.type) {
    case LOGIN_SUCCESS: {
      localStorage.cleganeUser = action.res.user.u;
      console.log('res : ', action.res);
      return state;
    }
    case LOGIN_FAIL: {
      console.log('err : ', action.err);
      return state;
    }
    case LOGOUT_SUCCESS: {
      localStorage.clear('cleganeUser');
      console.log('res : ', action.res);
      return state;
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
