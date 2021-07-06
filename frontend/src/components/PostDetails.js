import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { formatDate, sortBy } from '../utils/helper';
import { handleVotePost } from '../actions/posts';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import CommentsList from './CommentsList';
import AddComment from './AddComment';
import SortBy from './SortBy';
import VoteBtn from './VoteBtn';

class PostDetails extends Component {
  state={
    sortOption: 'timestamp-desc'
  }
  /**
   * Update the state with the user's sort option
   * @param {string} value - The sort option value
   */
  handleSorting = value => this.setState({sortOption: value});
  render() {  
    const { sortOption } = this.state;
    const { post, comments, handleVotePost } = this.props;
    // Sort posts depending on user's option
    const sortedComments = sortBy(comments, sortOption);
    const {
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      commentCount,
      id
    } = post;

    return (
      <Fragment>
        <div>
          <p>time : {formatDate(timestamp)}</p>
          <p>title: {title}</p>
          <p>body: {body}</p>
          <p>author: {author}</p>
          <p>category: {category}</p>   
          <VoteBtn id={id} handleVote={handleVotePost}>
            <p>vote: {voteScore}</p>
          </VoteBtn>
          <p>comment: {commentCount}</p>
          <button><FaTrashAlt /></button>
          <p></p>
          <button><FaEdit /></button>
          <hr />
        </div>
        <AddComment postId={id} />
        <SortBy handleSorting={this.handleSorting} />
        <CommentsList comments={sortedComments}/>
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

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleAddPost> ction creator
 */
 const mapDispatchToProps = {
  handleVotePost,
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);