import { combineReducers } from 'redux';
// Import the reducers
import { loadingBarReducer } from 'react-redux-loading-bar';
import categories from './categories';
import posts from './posts';
import comments from './comments';


/*
  Combine categories, posts and comments reducers into one root reducer
  as the <createStore> function only accepts a single reducer.
*/
export default combineReducers({
  categories,
  posts,
  comments, 
  loadingBar: loadingBarReducer,
});