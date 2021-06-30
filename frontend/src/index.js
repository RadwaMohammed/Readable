import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';
import App from './App';
import './index.css';

// Create store passing it the root reducer as first argument 
// and the middleware function as second argument
const store = createStore(reducer, middleware);
ReactDOM.render(  
  /*
   Wraps the app inside the Provider component 
   passing to it the store 
  */
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);