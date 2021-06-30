import { 
  showLoading, 
  hideLoading 
} from 'react-redux-loading-bar';
import { getInitialData } from '../utils/api';
import { receiveCategories } from '../actions/categories';
import { receivePosts } from '../actions/posts';
import { receiveComments } from '../actions/comments';

/**
 * Getting the initial data that the app needs
 * using redux-thunk pattern because we want to make asynchronous request
 */
export function handleInitialData() {
  return async dispatch => {
    dispatch(showLoading());
    try {
      const { categories, posts, comments } = await getInitialData();
      // Add categories, posts and comments to the state of the store
      dispatch(receivePosts(posts));
      dispatch(receiveComments(comments));
      dispatch(receiveCategories(categories));
      // After getting all data hide the loading-bar
      return dispatch(hideLoading());
    }
    catch (error) {
      alert('An error occured in receiving data. Please, try again.');
      return console.error('Error occured:', error);
    }
  }
}