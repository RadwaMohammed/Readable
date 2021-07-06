import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleVoteComment, handleDeleteComment } from '../actions/comments';
import { formatDate } from '../utils/helper';
import { FiEdit } from "react-icons/fi";
import VoteBtn from './VoteBtn';
import DeleteBtn from './DeleteBtn';

class Comment extends Component {
  
  render() {
    const { comment, handleVoteComment, handleDeleteComment } = this.props;
    const {
      timestamp,
      body,
      author,
      voteScore,
      deleted,
      id
    } = comment;

    return !deleted &&
      <div>
        <p>time : {formatDate(timestamp)}</p>
        <p>body: {body}</p>
        <p>author: {author}</p>
        <VoteBtn id={id} handleVote={handleVoteComment}>
          <p>vote: {voteScore}</p>
        </VoteBtn>
        <DeleteBtn handleDelete={handleDeleteComment} id={id} />
        <p></p>
        <button><FiEdit /></button>
        <hr />
      </div>   
  }
}
/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleVoteComment> ction creator
 * <handleDeleteComment> ction creator
 */
 const mapDispatchToProps = {
  handleVoteComment, 
  handleDeleteComment
};


export default connect(null, mapDispatchToProps)(Comment);
