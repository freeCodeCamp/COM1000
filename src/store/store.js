import reducer from './../reducers/reducer';
import {createStore} from 'redux';

let store = createStore(reducer);

export default store;
