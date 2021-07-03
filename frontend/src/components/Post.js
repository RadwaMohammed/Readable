import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helper';
import { FaChevronUp, FaChevronDown, FaTrashAlt, FaEdit } from "react-icons/fa";


class Post extends Component {
  render() {
    const { post } = this.props;
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
        <button><FaChevronUp /></button>
        <p>vote: {voteScore}</p>
        <button><FaChevronDown /></button>  
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


export default connect(mapStateToProps)(Post);
