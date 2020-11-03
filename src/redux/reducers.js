import {toggleLocalOrRemote} from './actions'

export function reducer(state, action) {
    switch(action.type) {
        case toggleLocalOrRemote: return { value: action.toggle };
        
        default: return state;
    }
}