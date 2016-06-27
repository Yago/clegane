import fetch from 'isomorphic-fetch';
import config from '../config/config.json';

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAIL = 'GET_ITEMS_FAIL';
export const GET_RESULTS_SUCCESS = 'GET_RESULTS_SUCCESS';
export const GET_RESULTS_FAIL = 'GET_RESULTS_FAIL';

export function getTmdbItems(request, page) {
  const query = `${config.tmdb.url}${request}?api_key=${config.tmdb.key}&page=${page}`;

  return dispatch => fetch(query)
    .then(res => res.json())
    .then(
      data => dispatch({ type: GET_ITEMS_SUCCESS, data }),
      err => dispatch({ type: GET_ITEMS_FAIL, err })
    );
}

export function getTmdbResults(terms) {
  const query = `${config.tmdb.url}search/multi?api_key=${config.tmdb.key}&query=${terms}`;

  return dispatch => fetch(query)
    .then(res => res.json())
    .then(
      data => dispatch({ type: GET_RESULTS_SUCCESS, data }),
      err => dispatch({ type: GET_RESULTS_FAIL, err })
    );
}
