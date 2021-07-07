import React, { Component, Fragment } from 'react';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate, sortBy } from '../utils/helper';
import { handleVotePost, handleDeletePost, handleEditPost } from '../actions/posts';
import CommentsList from './CommentsList';
import AddComment from './AddComment';
import SortBy from './SortBy';
import VoteBtn from './VoteBtn';
import DeleteBtn from './DeleteBtn';
import EditBtn from './EditBtn';

class PostDetails extends Component {
  state={
    sortOption: 'timestamp-desc',
  }
  /**
   * Update the state with the user's sort option
   * @param {string} value - The sort option value
   */
  handleSorting = value => this.setState({sortOption: value});
  
  render() {  
    const { sortOption } = this.state;
    const { 
      post, 
      comments, 
      handleVotePost, 
      handleDeletePost, 
      myPost, 
      handleEditPost, 
      categories,
      categoryPath
     } = this.props;

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

    return  myPost 
      ? 
      // Make sure that tha posts path in the right category
      (category === categoryPath 
        ?
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
          <DeleteBtn handleDelete={handleDeletePost} id={id} redirectHome />
          <p></p>
          <EditBtn id={id} currentData={post} handleEdit={handleEditPost} categories={categories} />
          <hr />
        </div>
        <AddComment postId={id} />
        <SortBy handleSorting={this.handleSorting} />
        <CommentsList comments={sortedComments}/>
      </Fragment>
      :
      <Redirect to={`/${category}/${id}`} />)
    : 
    <Redirect to='/404' />
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
 const mapStateToProps = ({ posts, comments, categories }, props) =>{ 
  const { post_id, category } = props.match.params;
  const myPost = Object.values(posts).find(post => post.id === post_id);
  return {
    myPost,
    post: myPost || {},
    comments: Object.values(comments)
      .filter(comment => comment.parentId === post_id), 
    postId: post_id,
    categories: Object.values(categories),
    categoryPath: category
  }
};

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleAddPost> ction creator
 * <handleDeletePost> ction creator
  * <handleEditPost> ction creator
 */
 const mapDispatchToProps = {
  handleVotePost,
  handleDeletePost,
  handleEditPost
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);