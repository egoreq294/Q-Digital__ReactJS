import {toggleLocalOrRemote} from './actions';

function toggleLocalOrRemoteCreator(value) {
    return { 
        type: toggleLocalOrRemote,
        toggle: value
    };
}

export default toggleLocalOrRemoteCreator;