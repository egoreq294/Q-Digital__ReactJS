import {toggleLocalOrRemote} from './actions';

function toggleLocalOrRemoteCreator(value) {
    return { 
        type: toggleLocalOrRemote,
        imgStore: value
    };
}

export default toggleLocalOrRemoteCreator;