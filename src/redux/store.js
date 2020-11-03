import { createStore } from 'redux';
import {reducer} from './reducers';

const store = createStore(reducer, {toggle: false});

export default store;