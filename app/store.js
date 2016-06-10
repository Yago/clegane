import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { syncHistoryWithStore} from 'react-router-redux';
import { browserHistory } from 'react-router';

// import the root reducer
import rootReducer from './reducers/index';

// create an object for the default data
const defaultState = {};
const loggerMiddleware = createLogger();

// Set store
const store = createStore(
    rootReducer,
    defaultState,
    compose(
      applyMiddleware(
        thunkMiddleware
      ),
      window.devToolsExtension && window.devToolsExtension()
    )
  );

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
