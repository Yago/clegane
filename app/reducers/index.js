import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import items from './items';
import tmdb from './tmdb';

const rootReducer = combineReducers({items, tmdb, routing: routerReducer });

export default rootReducer;
