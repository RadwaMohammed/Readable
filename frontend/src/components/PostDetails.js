import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../utils/helper';
import { handleAddComment } from '../actions/comments';
import CommentsList from './CommentsList';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FaChevronUp, FaChevronDown, FaTrashAlt, FaEdit } from "react-icons/fa";


class PostDetails extends Component {
  state = {
    commentAuthor: '',
    comment: ''
  };
  /**
   * Handle the change on the input text 
   * in the add a commet form
   * @param {e} e - event object 
   */
   handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  }
  
  /**
   * Handle the submit to add new post
   * @param {object} e - The event object 
   */
   handleSubmit = e => {
    const { commentAuthor: author, comment: body } = this.state;
    const { handleAddComment, postId: parentId } = this.props;
    const comment = { author, body, parentId };
    e.preventDefault();
    handleAddComment(comment);
    this.setState({
      commentAuthor: '',
      comment: ''
    });
  }
  render() {
    const { commentAuthor, comment } = this.state;
    const { post, comments } = this.props;
    const {
      timestamp,
      title,
      body,
      author,
      category,
      voteScore,
      commentCount,
    } = post;

    return (
      <Fragment>
        <div>
          <p>time : {formatDate(timestamp)}</p>
          <p>title: {title}</p>
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
        <Accordion>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Add a comment
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="commentAuthor">
                    <Form.Label>Author</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter Your Name" 
                      value={commentAuthor}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={2}  
                      placeholder="Type Your Comment"
                      value={comment}
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={!commentAuthor.trim() || !comment.trim()}
                  >
                    Add a comment
                  </Button>
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
        <CommentsList comments={comments}/>
      </Fragment>
    )
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
 const mapStateToProps = ({ posts, comments }, props) =>{ 
  const { post_id } = props.match.params;
  return {
    post: Object.values(posts)
      .find(post => post.id === post_id),
    comments: Object.values(comments)
      .filter(comment => comment.parentId === post_id), 
    postId: post_id,
  }
};

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleAddPost> ction creator
 */
 const mapDispatchToProps = {
  handleAddComment,
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);