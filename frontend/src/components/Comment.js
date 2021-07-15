import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleVoteComment, handleDeleteComment, handleEditComment } from '../actions/comments';
import { formatDate } from '../utils/helper';
import VoteBtn from './VoteBtn';
import DeleteBtn from './DeleteBtn';
import EditBtn from './EditBtn';
import EditComment from './EditComment';

class Comment extends Component {
  state = {
    show: false
  }

  /**
   * Show edit comment form
   */
  showEditForm  = () => {
    this.setState({
      show: true
    });
  }
  /**
   * Hide edit comment form
   */
  hideEditForm = () => {
    this.setState({
      show: false
    });
  }
  /**
   * Handle Editing comment
   * @param {string} commentId - The comment's id
   * @param {object} comment - The edited comment object
   */
   handleEdit = (commentId, comment) => {
    const { handleEditComment } = this.props;
    handleEditComment(commentId, comment);
    this.hideEditForm();
  };
  render() {
    const { 
      comment, 
      handleVoteComment, 
      handleDeleteComment, 
    } = this.props;
    const {
      timestamp,
      body,
      author,
      voteScore,
      deleted,
      id
    } = comment;
    const { show } = this.state;
    return !deleted &&
      <div className="comment-container">
        <div className="vote-btn">
          <VoteBtn id={id} handleVote={handleVoteComment}>
            <span>{voteScore}</span>
          </VoteBtn>
        </div>
        <div className="content">
          {
            show
            ?
            <EditComment 
              hide={this.hideEditForm} 
              comment={comment} 
              handleEdit={this.handleEdit}
            />
            :
            <p>{body}</p>
          }
          <div className="comment-footer">
            <div className="time-auther-wrapper">
              <span className="time">{formatDate(timestamp)}</span>
              <span className="author">by <strong>{author}</strong></span>
            </div>
            <div className="edit-delete-wrapper">
              <EditBtn showEditForm={this.showEditForm} commentEdit />
              <DeleteBtn handleDelete={handleDeleteComment} id={id} />
            </div>
          </div>
        </div>
      </div>   
  }
}
/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleVoteComment> ction creator
 * <handleDeleteComment> ction creator
 * <handleEditComment> ction creator
 */
 const mapDispatchToProps = {
  handleVoteComment, 
  handleDeleteComment,
  handleEditComment
};


export default connect(null, mapDispatchToProps)(Comment);
