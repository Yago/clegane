import fetch from 'isomorphic-fetch';
import config from '../config/config.json';

export const GET_DATA_SUCCESS = 'GET_DATA_SUCCESS';
export const GET_DATA_FAIL = 'GET_DATA_FAIL';

export function getTmdbItems(request, page) {
  const query = `${config.tmdb.url}${request}?api_key=${config.tmdb.key}&page=${page}`;

  return dispatch => fetch(query)
    .then(res => res.json())
    .then(
      data => dispatch({ type: GET_DATA_SUCCESS, data }),
      err => dispatch({ type: GET_DATA_FAIL, err })
    );
}
