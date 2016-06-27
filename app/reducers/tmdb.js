import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL
} from '../actions/tmdb';

function tmdb(state = {}, action) {
  switch(action.type) {
    case GET_ITEMS_SUCCESS: {
      return {...state, items: action.data.results};
    }
    case GET_ITEMS_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default tmdb;
