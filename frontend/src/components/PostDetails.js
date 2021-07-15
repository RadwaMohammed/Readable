import React, { Component, Fragment } from 'react';
import  { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate, sortBy } from '../utils/helper';
import { 
  handleVotePost, 
  handleDeletePost, 
  handleEditPost 
} from '../actions/posts';
import { 
  SiReact, 
  SiRedux, 
  SiUdacity 
} from 'react-icons/si';
import { 
  BsChatSquareDots, 
  BsArrowReturnLeft 
} from 'react-icons/bs';
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
    const categoryIcons = {
      'react': <SiReact className="category-icon" />,
      'redux': <SiRedux className="category-icon" />,
      'udacity': <SiUdacity className="category-icon" />
    };
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
    const { history } = this.props;

    return  myPost 
      ? 
      // Make sure that tha posts path in the right category
      (category === categoryPath 
        ?
        <Fragment>
          <button type="button" className="back-btn" onClick={history.goBack}>
            <BsArrowReturnLeft /> Back
          </button>
          <div className="detail-wrapper">
            <div className="post-wrapper">
              <div className="post-header">
                <h2 className="detail-title">{title}</h2>
                <Link className="category" to={`/${category}`}>
                  {categoryIcons[category]}{category}
                </Link>
              </div>
              <span className="time">
                {formatDate(timestamp)}
              </span>
              <span className="author">
                by <strong>{author}</strong>
              </span>
              <div className="post-content-wrapper">
                <div className="body-score-wrapper">
                  <div className="vote-btn">
                    <VoteBtn id={id} handleVote={handleVotePost}>
                      <span>{voteScore}</span>
                    </VoteBtn>
                  </div>
                  <div className="content">
                    <p>
                      {body}
                    </p>
                    <div className="post-btns-wrapper">
                      <button 
                        className ="comments-link" 
                        onClick={
                          () => document.getElementById('comments').scrollIntoView({
                            // optional params
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'center',
                          })
                        }
                      >
                        <BsChatSquareDots />
                        {`  ${commentCount} comment${commentCount === 1 ? '' : 's'}`}
                      </button>
                      <div className="edit-delete-wrapper">
                        <EditBtn 
                          id={id} 
                          currentData={post} 
                          handleEdit={handleEditPost} 
                          categories={categories} 
                        />
                        <DeleteBtn handleDelete={handleDeletePost} id={id} redirectHome />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddComment postId={id} />
            <h3 className="comments-title" id="comments">Comments</h3>
            <div className="comments-wrapper">
              <SortBy handleSorting={this.handleSorting} />
              <CommentsList comments={sortedComments}/>
            </div>
          </div>
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
 *                      myPost is the post object{object} or undefined {undefined} if not found
 *                      post {object} 
 *                      post's comments {array}
 *                      post's id {string}
 *                      categories array {array}
 *                      category in the current url {string}
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
 * <handleAddPost> action creator
 * <handleDeletePost> action creator
  * <handleEditPost> action creator
 */
 const mapDispatchToProps = {
  handleVotePost,
  handleDeletePost,
  handleEditPost
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);