import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleVotePost } from '../actions/posts';
import { formatDate } from '../utils/helper';
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import VoteBtn from './VoteBtn';


class Post extends Component {
  render() {
    const { post, handleVotePost } = this.props;
    const {
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      commentCount, 
      id, 
      deleted
    } = post;
    return !deleted &&
      <div>
        <p>time : {formatDate(timestamp)}</p>
        <p>title: <Link to={`/${category}/${id}`}>{title}</Link></p>
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

      
    
  }
}
/**
 * The mapStateToProps function - get the state parts that Post component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.categories - The categories slice of the state 
 * @returns {object} An object containing categories {array} 
 */
 const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories),
});


/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleVotePost> ction creator
 */
 const mapDispatchToProps = {
  handleVotePost,
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);