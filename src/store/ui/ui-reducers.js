import { ACTION_TYPE } from './ui-actions';
import initialState from './ui-initial-state';

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
