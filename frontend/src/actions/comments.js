import { 
  showLoading, 
  hideLoading 
} from 'react-redux-loading-bar';
import * as ReadableAPI from '../utils/api';
import { formatComment } from '../utils/helper';
import { commentCounter } from '../actions/posts';

// Variables to hold action type
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RE_ADD_COMMENT = 'RE_ADD_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const RESET_VOTE_COMMENT = 'RESET_VOTE_COMMENT';
export const DELETE_COMMENT_PARENT = 'DELETE_COMMENT_PARENT';
export const ADD_COMMENT_PARENT = 'ADD_COMMENT_PARENT';

/**
 * Action creator - receiveComments
 * @param {object} posts - The posts slice of the state
 * @returns {object} The action object
 */
export function receiveComments(comments) {
  return {
    type: RECEIVE_COMMENTS, // Type of event occured
    comments, 
  };
}

/**
 * Action creator - addComment
 * @param {object} comment - The new comment 
 * @param {string} id - The (parent) post's id 
 * @returns {object} The action object
 */
function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  };
}

/**
 * Action creator - editComment
 * @param {string} id - The comment's id 
 * @param {object} comment - The updted comment
 * @returns {object} The action object
 */
function editComment(id, comment) {
  return {
    type: EDIT_COMMENT,
    id,
    comment
  };
}

/**
 * Action creator - deleteComment
 * @param {string} id - The comment's id 
 * @returns {object} The action object
 */
function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id,
  };
}

/**
 * Action creator - reAddComment
 * @param {string} id - The comment's id 
 * @returns {object} The action object
 */
function reAddComment(id) {
  return {
    type: RE_ADD_COMMENT,
    id,
  };
}

/**
 * Action creator - voteComment
 * @param {string} id - The comment's id
 * @param {string} option - The user's vote option
 * @returns {object} The action object
 */
function voteComment(id, option) {
  return {
    type: VOTE_COMMENT,
    id,
    option,
  };
}

/**
 * Action creator - resetVoteComment
 * @param {string} id - The comment's id
 * @param {string} option - The user's vote option
 * @returns {object} The action object
 */
export function resetVoteComment(id, option){
  return {
    type: RESET_VOTE_COMMENT,
    id,
    option,
  };
}

/**
 * Action creator - deleteCommentParent
 * @param {string} id - The post's id 
 * @returns {object} The action object
 */
export function deleteCommentParent(id) {
  return {
    type: DELETE_COMMENT_PARENT,
    id,
  };
}

/**
 * Action creator - addCommentParent
 * @param {string} id - The post's id 
 * @returns {object} The action object
 */
export function addCommentParent(id) {
  return {
    type: ADD_COMMENT_PARENT,
    id,
  };
} 


/**
 * Asynchronous action creator - handleAddComment
 * @param {Object} comment - The new comment object
 */
export function handleAddComment(comment) {
  return async dispatch => {
    // Before the request show loading bar
    dispatch(showLoading());
    try {
      const newComment = await ReadableAPI.addComment(formatComment(comment));
      // Add the new post to the store
      dispatch(addComment(newComment));
      // Increment parent post comment counter by 1
      dispatch(commentCounter(newComment.parentId, 1));
      // Then hide the loading bar
      return dispatch(hideLoading());
    }
    catch (error) {
      alert('An error occured. Please, try again.');
      return console.error('Error occured:', error);
    }
  }
}

/**
 * Asynchronous action creator - handleEditComment
 * @param {string} id - The comment's id
 * @param {Object} comment - The updated comment object
 */
export function handleEditComment(id, comment) {

  return async dispatch => {
    try {
      dispatch(editComment(id, comment));
      return await ReadableAPI.editComment(id, comment);
    }
    catch (error) {
      const currentComment = await ReadableAPI.getComment(id);
      dispatch(editComment(id, currentComment));
      alert('An error occured. Please, try again.');
      return console.error('Error occured:', error);
    }
  }
}

/**
 * Asynchronous action creator - handleDeleteComment
 * @param {string} id - The comment's id
 */
export function handleDeleteComment(id) {
  return async dispatch => {
    dispatch(deleteComment(id));
    const deletedComment = await ReadableAPI.getComment(id);
    // Decrement parent post comment counter by 1
    dispatch(commentCounter(deletedComment.parentId, -1));
    try {
      return ReadableAPI.deleteComment(id);
    } catch (error) {
      dispatch(reAddComment(id));
      // Increment parent post comment counter by 1
      dispatch(commentCounter(deletedComment.parentId, 1));
      alert('An error occured. Please, try again.');
      console.error('Error occured:', error);
    }
  }
}

/**
 * Asynchronous action creator - handleVoteComment
 * @param {string} id - The comment's id
 * @param {string} option - The user's vote option
 */
export function handleVoteComment(id, option) {
  return dispatch => {
    dispatch(voteComment(id, option));
    return ReadableAPI.voteComment(id, option)
      .catch (error => {
        dispatch(resetVoteComment(id, option));
        alert('An error occured. Please, try again.');
        console.error('Error occured:', error);
      });
  }
}