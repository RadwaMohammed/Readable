import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleVoteComment } from '../actions/comments';
import { formatDate } from '../utils/helper';
import { FiTrash2, FiEdit } from "react-icons/fi";
import VoteBtn from './VoteBtn';

class Comment extends Component {
  
  render() {
    const { comment, handleVoteComment } = this.props;
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
        <button><FiTrash2 /></button>
        <p></p>
        <button><FiEdit /></button>
        <hr />
      </div>   
  }
}
/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleVoteComment> ction creator
 */
 const mapDispatchToProps = {
  handleVoteComment, 
};


export default connect(null, mapDispatchToProps)(Comment);
