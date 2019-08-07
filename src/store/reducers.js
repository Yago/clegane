import { combineReducers } from 'redux';

import { reducers as ui } from './ui/index';

const rootReducer = combineReducers({
  ui,
});

export default rootReducer;
