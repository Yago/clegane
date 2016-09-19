import fetch from 'isomorphic-fetch';
import config from '../config/config.json';

export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAIL = 'GET_ITEMS_FAIL';

export const GET_RESULTS_SUCCESS = 'GET_RESULTS_SUCCESS';
export const GET_RESULTS_FAIL = 'GET_RESULTS_FAIL';

export const GET_MOVIE_DATA_SUCCESS = 'GET_MOVIE_DATA_SUCCESS';
export const GET_MOVIE_CREDITS_SUCCESS = 'GET_MOVIE_CREDITS_SUCCESS';
export const GET_MOVIE_VIDEOS_SUCCESS = 'GET_MOVIE_VIDEOS_SUCCESS';
export const GET_MOVIE_SIMILAR_SUCCESS = 'GET_MOVIE_SIMILAR_SUCCESS';
export const GET_MOVIE_KEYWORDS_SUCCESS = 'GET_MOVIE_KEYWORDS_SUCCESS';

export const GET_TV_DATA_SUCCESS = 'GET_TV_DATA_SUCCESS';
export const GET_TV_CREDITS_SUCCESS = 'GET_TV_CREDITS_SUCCESS';
export const GET_TV_VIDEOS_SUCCESS = 'GET_TV_VIDEOS_SUCCESS';
export const GET_TV_SIMILAR_SUCCESS = 'GET_TV_SIMILAR_SUCCESS';
export const GET_TV_EXTERNAL_IDS_SUCCESS = 'GET_TV_EXTERNAL_IDS_SUCCESS';

export const GET_PEOPLE_DATA_SUCCESS = 'GET_PEOPLE_DATA_SUCCESS';
export const GET_PEOPLE_CREDITS_SUCCESS = 'GET_PEOPLE_CREDITS_SUCCESS';
export const GET_PEOPLE_IMAGES_SUCCESS = 'GET_PEOPLE_IMAGES_SUCCESS';

export const GET_ITEM_DATA_FAIL = 'GET_ITEM_DATA_FAIL';

// Get items for media grid
export function getTmdbItems(request, page) {
  const query = `${config.tmdb.url}${request}?api_key=${config.tmdb.key}&page=${page}`;

  return dispatch => fetch(query)
    .then(res => res.json())
    .then(data => dispatch({ type: GET_ITEMS_SUCCESS, data }))
    .catch(err => dispatch({ type: GET_ITEMS_FAIL, err }));
}

// Get results for autocomplete and search grid
export function getTmdbResults(terms) {
  const query = `${config.tmdb.url}search/multi?api_key=${config.tmdb.key}&query=${terms}`;

  return dispatch => fetch(query)
    .then(res => res.json())
    .then(data => dispatch({ type: GET_RESULTS_SUCCESS, data }))
    .catch(err => dispatch({ type: GET_RESULTS_FAIL, err }));
}

// Get items for media grid
export function getTmdbItemData(type, id, request) {
  const set = request ? `/${request}` : '',
        query = `${config.tmdb.url}${type}/${id}${set}?api_key=${config.tmdb.key}`;

  let dispatcher = GET_MOVIE_DATA_SUCCESS;
  if (type === 'movie') {
    switch (request) {
      case 'credits': {
        dispatcher = GET_MOVIE_CREDITS_SUCCESS;
        break;
      }
      case 'videos': {
        dispatcher = GET_MOVIE_VIDEOS_SUCCESS;
        break;
      }
      case 'similar': {
        dispatcher = GET_MOVIE_SIMILAR_SUCCESS;
        break;
      }
      case 'keywords': {
        dispatcher = GET_MOVIE_KEYWORDS_SUCCESS;
        break;
      }
      default: {
        dispatcher = GET_MOVIE_DATA_SUCCESS;
        break;
      }
    }
  } else if (type === 'tv') {
    switch (request) {
      case 'credits': {
        dispatcher = GET_TV_CREDITS_SUCCESS;
        break;
      }
      case 'videos': {
        dispatcher = GET_TV_VIDEOS_SUCCESS;
        break;
      }
      case 'similar': {
        dispatcher = GET_TV_SIMILAR_SUCCESS;
        break;
      }
      case 'external_ids': {
        dispatcher = GET_TV_EXTERNAL_IDS_SUCCESS;
        break;
      }
      default: {
        dispatcher = GET_TV_DATA_SUCCESS;
        break;
      }
    }
  } else if (type === 'person') {
    switch (request) {
      case 'combined_credits': {
        dispatcher = GET_PEOPLE_CREDITS_SUCCESS;
        break;
      }
      case 'tagged_images': {
        dispatcher = GET_PEOPLE_IMAGES_SUCCESS;
        break;
      }
      default: {
        dispatcher = GET_PEOPLE_DATA_SUCCESS;
        break;
      }
    }
  }

  return dispatch => fetch(query)
    .then(res => res.json())
    .then(data => dispatch({ type: dispatcher, data }))
    .catch(err => dispatch({ type: GET_ITEMS_FAIL, err }));
}
