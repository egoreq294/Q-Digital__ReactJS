import {REMOTE} from './actionTypes';

const initialState = {remote: []};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOTE: {
      return {remote: action.remote};
    }
    default:
      return state;
  }
}
