import { ACTION_TYPE } from './blank-actions';
import initialState from './blank-initial-state';

export default function blankReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_TYPE:
      return {
        ...state,
      };

    default:
      return state;
  }
}
