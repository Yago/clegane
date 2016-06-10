import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import items from './items';
import tmdb from './tmdb';
import user from './user';

const rootReducer = combineReducers({items, tmdb, user, routing: routerReducer });

export default rootReducer;
