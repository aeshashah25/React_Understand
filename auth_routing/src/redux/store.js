// store.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { thunk } from 'redux-thunk'; // Correct import

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
