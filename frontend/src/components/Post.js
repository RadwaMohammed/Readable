import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { handleVotePost, handleDeletePost } from '../actions/posts';
import { formatDate } from '../utils/helper';
import { FaEdit } from "react-icons/fa";
import VoteBtn from './VoteBtn';
import DeleteBtn from './DeleteBtn';


class Post extends Component {
  render() {
    const { post, handleVotePost, handleDeletePost } = this.props;
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
        <DeleteBtn handleDelete={handleDeletePost} id={id} />
        <p></p>
        <button><FaEdit /></button>
        <hr />
      </div>

      
    
  }
}

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleVotePost> ction creator
 * <handleDeletePost> ction creator
 */
 const mapDispatchToProps = {
  handleVotePost,
  handleDeletePost,
};


export default connect(null, mapDispatchToProps)(Post);