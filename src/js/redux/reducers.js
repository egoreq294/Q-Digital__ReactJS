import { LOCAL_OR_REMOTE } from './actionTypes';
import { localStore } from '../pages/sliderPage';

const initialState = { imgs: localStore };

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOCAL_OR_REMOTE: {
            return { imgs: action.imgs };
        }
        default:
            return state;
    }
}
