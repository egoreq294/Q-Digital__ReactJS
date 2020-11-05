import {toggleLocalOrRemote} from './actions'

export function reducer(state, action) {
    switch(action.type) {
        case toggleLocalOrRemote: return {imgStore: state.imgStore === 'localStore' ? 'remoteStore' : 'localStore'};
        
        default: return state;
    }
}