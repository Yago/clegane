import axios from 'axios';
import { pipe } from 'ramda';

// Append key to API URL
const withKey = key => url =>
  `${url}${url.includes('?') ? '&' : '?'}api_key=${key}`;

// Axios fetch wrapper
const fetch = url =>
  axios
    .get(url)
    .then(res => res.data)
    .catch(err => console.error('Damned...', err));

// Based on URL, execute required tasks to fetch data
const composeApi = pipe(
  withKey('6d83177ea3e67b870ab80fa72f06cbbd'),
  fetch
);

// Construct the full API URL
const fetchApi = baseURL => endpoint => composeApi(`${baseURL}${endpoint}`);

// Set TMDB base url
const fetchTMDB = fetchApi('http://api.themoviedb.org/3');

// Specific endpoints
export const fetchTV = id => fetchTMDB(`/tv/${id}`);
