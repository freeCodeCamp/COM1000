import reducer from './reducer';
import {createStore, compose} from 'redux';

let store = createStore(reducer, compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

export default store;
