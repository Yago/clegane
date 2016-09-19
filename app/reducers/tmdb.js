import {
  GET_ITEMS_SUCCESS,
  GET_ITEM_DATA_SUCCESS,
  GET_RESULTS_SUCCESS,
  GET_REQUEST_FAIL,
  CLEAN_SUCCESS
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
    case GET_RESULTS_SUCCESS: {
      return {...state, results: action.data.results};
    }
    case GET_ITEM_DATA_SUCCESS: {
      return {...state, [action.slot]: action.data};
    }
    case GET_REQUEST_FAIL: {
      return state;
    }
    case CLEAN_SUCCESS: {
      return {};
    }
    default: {
      return state;
    }
  }
}

export default tmdb;
