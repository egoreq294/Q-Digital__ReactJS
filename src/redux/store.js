import { createStore } from 'redux';
import {reducer} from './reducers';

const store = createStore(reducer, {imgStore: 'localStore'});

export default store;