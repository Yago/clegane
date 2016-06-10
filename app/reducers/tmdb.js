import fetch from 'isomorphic-fetch';

import {
  GET_DATA_SUCCESS,
  GET_DATA_FAIL
} from '../actions/tmdb';

function tmdb(state = [], action) {
  switch(action.type) {
    case GET_DATA_SUCCESS: {
      return state.concat(action.data.results);
    }
    case GET_DATA_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default tmdb;
