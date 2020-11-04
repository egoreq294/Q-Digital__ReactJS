import {toggleLocalOrRemote} from './actions'

export function reducer(state, action) {
    switch(action.type) {
        case toggleLocalOrRemote: return {toggle: state.toggle?false:true};
        
        default: return state;
    }
}