import { LOCAL_OR_REMOTE } from './actionTypes';

export const localRemote = (content) => ({
    type: LOCAL_OR_REMOTE,
    imgs: content,
});
