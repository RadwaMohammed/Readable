import React, { Component } from 'react';
import { formatDate } from '../utils/helper';
import { FiChevronUp, FiChevronDown, FiTrash2, FiEdit } from "react-icons/fi";

class Comment extends Component {
  
  render() {
    const { comment } = this.props;
    const {
      timestamp,
      body,
      author,
      voteScore,
      deleted
    } = comment;

    return !deleted &&
      <div>
        <p>time : {formatDate(timestamp)}</p>
        <p>body: {body}</p>
        <p>author: {author}</p>
        <button><FiChevronUp /></button>
        <p>vote: {voteScore}</p>
        <button><FiChevronDown /></button>
        <button><FiTrash2 /></button>
        <p></p>
        <button><FiEdit /></button>
        <hr />
      </div>   
  }
}

export default Comment;
