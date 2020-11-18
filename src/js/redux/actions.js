import {REMOTE} from './actionTypes';

export const setRemote = (content) => ({
  type: REMOTE,
  remote: content,
});
