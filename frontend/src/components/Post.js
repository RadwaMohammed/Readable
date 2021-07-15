import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  handleVotePost, 
  handleDeletePost, 
  handleEditPost 
} from '../actions/posts';
import { formatDate } from '../utils/helper';
import { 
  SiReact, 
  SiRedux, 
  SiUdacity 
} from 'react-icons/si';
import { BsChatSquareDots } from 'react-icons/bs';
import VoteBtn from './VoteBtn';
import DeleteBtn from './DeleteBtn';
import EditBtn from './EditBtn';





class Post extends Component {
  render() {
    const categoryIcons = {
      'react': <SiReact className="category-icon" />,
      'redux': <SiRedux className="category-icon" />,
      'udacity': <SiUdacity className="category-icon" />
    };
    const { 
      post, 
      handleVotePost, 
      handleDeletePost, 
      handleEditPost, 
      categories
    } = this.props;
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
      <div className="post-wrapper">
        <div className="post-header">
          <h2><Link className="title" to={`/${category}/${id}`}>{title}</Link></h2>
          <Link className="category" to={`/${category}`}>{categoryIcons[category]}{category}</Link>
        </div>
        <span className="time">{formatDate(timestamp)}</span>
        <span className="author">by <strong>{author}</strong></span>
        <div className="post-content-wrapper">
          <div className="body-score-wrapper">
            <div className="vote-btn">
              <VoteBtn id={id} handleVote={handleVotePost}>
                <span>{voteScore}</span>
              </VoteBtn>
            </div>
            <div className="content">
              <p>
                {body.slice(0, 80)}
                {
                  body.slice(0, 80).length !== body.length 

                  && <Link className="more" to={`/${category}/${id}`}> ...more</Link>
                }
              </p>
              <div className="post-btns-wrapper">
                <Link className ="comments-link" to={`/${category}/${id}`}>
                  <BsChatSquareDots />
                  {`  ${commentCount} comment${commentCount === 1 ? '' : 's'}`}
                </Link>
                <div className="edit-delete-wrapper">
                  <EditBtn id={id} currentData={post} handleEdit={handleEditPost} categories={categories} />
                  <DeleteBtn handleDelete={handleDeletePost} id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
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
 * <handleDeletePost> ction creator
 * <handleEditPost> ction creator
 */
 const mapDispatchToProps = {
  handleVotePost,
  handleDeletePost,
  handleEditPost
};


export default connect(mapStateToProps, mapDispatchToProps)(Post);