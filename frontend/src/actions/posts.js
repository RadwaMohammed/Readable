import { 
  showLoading, 
  hideLoading 
} from 'react-redux-loading-bar';
import * as ReadableAPI from '../utils/api';
import { formatPost } from '../utils/helper';
import { 
  addCommentParent, 
  deleteCommentParent 
} from '../actions/comments';

// Variables to hold action type
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const ADD_POST = 'ADD_POST';
export const RE_ADD_POST = 'RE_ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const RESET_VOTE_POST = 'RESET_VOTE_POST';
export const COMMENT_COUNTER = 'COMMENT_COUNTER';

/**
 * Action creator - receivePosts
 * @param {object} posts - The posts slice of the state
 * @returns {object} The action object
 */
export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS, // Type of event occured
    posts, 
  };
}

/**
 * Action creator - addPost
 * @param {object} post - The new post 
 * @returns {object} The action object
 */
function addPost(post) {
  return {
    type: ADD_POST,
    post
  };
}

/**
 * Action creator - editPost
 * @param {string} id - The post's id
 * @param {object} post - The updted post 
 * @returns {object} The action object
 */
function editPost(id, post) {
  return {
    type: EDIT_POST,
    post, 
    id
  };
}

/**
 * Action creator - deletePost
 * @param {string} id - The post's id 
 * @returns {object} The action object
 */
function deletePost(id) {
  return {
    type: DELETE_POST,
    id,
  };
}

/**
 * Action creator - reAddPost
 * @param {string} id - The post's id 
 * @returns {object} The action object
 */
function reAddPost(id) {
  return {
    type: RE_ADD_POST,
    id,
  };
}

/**
 * Action creator - votePost
 * @param {string} id - The post's id
 * @param {string} option - The user's vote option
 * @returns {object} The action object
 */
function votePost(id, option){
  return {
    type: VOTE_POST,
    id,
    option,
  };
}

/**
 * Action creator - resetVotePost
 * @param {string} id - The post's id
 * @param {string} option - The user's vote option
 * @returns {object} The action object
 */
export function resetVotePost(id, option){
  return {
    type: RESET_VOTE_POST,
    id,
    option,
  };
}

/**
 * Action creator - commentCounter
 * @param {string} id - The post's id (comment's parent)
 * @param {number} count - Increment/Decrement - comments count
 * @returns {object} The action object
 */
export function commentCounter(id, count) {
  return {
    type: COMMENT_COUNTER,
    id,
    count
  };
}

/**
 * Asynchronous action creator - handleAddPost
 * @param {Object} post - The new post object
 */
export function handleAddPost(post) {
  return async dispatch => {
    // Before the request show loading bar
    dispatch(showLoading());
    try {
      const newPost = await ReadableAPI.addPost(formatPost(post));
      // Add the new post to the store
      dispatch(addPost(newPost));
      // Then hide the loading bar
      return dispatch(hideLoading());
    }
    catch (error) {
      alert('An error occured. Please, try again.');
      return console.warn('Error occured:', error);
    }
  }
}

/**
 * Asynchronous action creator - handleEditPost
 * @param {string} id - The post's id
 * @param {Object} post - The updated post object
 */
export function handleEditPost(id, post) {
  return async dispatch => {
    dispatch(editPost(id, post));
    try {
      return await ReadableAPI.editPost(id, post);
    }
    catch (error) {
      alert('An error occured. Please, try again.');
      const currentPost = await ReadableAPI.getPost(id);
      dispatch(editPost(id, currentPost));     
      return console.warn('Error occured:', error);
    }
  }
}

/**
 * Asynchronous action creator - handleDeletePost
 * @param {string} id - The post's id
 */
export function handleDeletePost(id) {
  return async dispatch => {
    // The post (parent) delete for its comment
    dispatch(deleteCommentParent(id));
    // Delete post
    dispatch(deletePost(id));
    try {
      return await ReadableAPI.deletePost(id);
    } catch (error) {
      dispatch(reAddPost(id));
      dispatch(addCommentParent(id));
      alert('An error occured. Please, try again.');
      console.warn('Error occured:', error);
    }
  }
}

/**
 * Asynchronous action creator - handleVotePost
 * @param {string} id - The post's id
 * @param {string} option - The user's vote option
 */
export function handleVotePost(id, option) {
  return async dispatch => {
    dispatch(votePost(id, option));
    try {
      return await ReadableAPI.votePost(id, option);
    } catch (error) {
      dispatch(resetVotePost(id, option));
      alert('An error occured. Please, try again.');
      console.warn('Error occured:', error);
    }
  }
}