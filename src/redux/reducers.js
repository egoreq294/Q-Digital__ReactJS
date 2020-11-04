import {toggleLocalOrRemote} from './actions'

export function reducer(state, action) {
    switch(action.type) {
        case toggleLocalOrRemote: return { toggle: action.toggle};
        
        default: return state;
    }
}