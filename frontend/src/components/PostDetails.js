import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helper';
import CommentsList from './CommentsList';
import { FiChevronUp, FiChevronDown, FiTrash2, FiEdit } from "react-icons/fi";


class PostDetails extends Component {
  render() {
    const { post, comments } = this.props;
    const {
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      commentCount,
    } = post;

    return (
      <Fragment>
        <div>
          <p>time : {formatDate(timestamp)}</p>
          <p>title: {title}</p>
          <p>body: {body}</p>
          <p>author: {author}</p>
          <p>category: {category}</p>
          <button><FiChevronUp /></button>
          <p>vote: {voteScore}</p>
          <button><FiChevronDown /></button>
          <p>comment: {commentCount}</p>
          <button><FiTrash2 /></button>
          <p></p>
          <button><FiEdit /></button>
          <hr />
        </div>
        <CommentsList comments={comments}/>
      </Fragment>
    )
  }
}


/**
 * The mapStateToProps function - get the state parts that PostDetails component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.posts - The  posts slice of the state 
 * @param {object} state.comments - The  comments slice of the state 
 * @param {Object} props - The component's ownProps
 * @returns {object} An object containing  
 *                      current post {object} 
 *                      post's comments {array}
 *                      post's id {string}
 */
 const mapStateToProps = ({ posts, comments }, props) =>{ 
  const { post_id } = props.match.params;
  return {
    post: Object.values(posts)
      .find(post => post.id === post_id),
    comments: Object.values(comments)
      .filter(comment => comment.parentId === post_id), 
    postId: post_id,
  }
};

export default connect(mapStateToProps)(PostDetails);