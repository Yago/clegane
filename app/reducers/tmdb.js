import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAIL,
  GET_RESULTS_SUCCESS,
  GET_RESULTS_FAIL
} from '../actions/tmdb';

function tmdb(state = {}, action) {
  switch(action.type) {
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        items: action.data.results,
        total_pages: action.data.total_pages,
        total_results: action.data.total_results
      };
    }
    case GET_ITEMS_FAIL: {
      return state;
    }
    case GET_RESULTS_SUCCESS: {
      return {...state, results: action.data.results};
    }
    case GET_RESULTS_FAIL: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export default tmdb;
