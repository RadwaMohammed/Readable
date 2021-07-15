import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddComment } from '../actions/comments';
import { MdAdd } from 'react-icons/md';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

class AddComment extends Component {
  state = {
    commentAuthor: '',
    comment: '' 
  };

  /**
   * Handle the change on the input text 
   * in the add a commet form
   * @param {object} e - event object 
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
    const isEmpty = !commentAuthor.trim() || !comment.trim();
    return (
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            <MdAdd className="add-comment-icon" /> Add New Comment
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
                <p className="not-empty">{isEmpty ? 'All input fields must be filled out.' : ''}</p>
                <button 
                  type="submit"
                  disabled={isEmpty}
                >
                  Add comment
                </button>
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    )
  }
}

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleAddComment> action creator
 */
 const mapDispatchToProps = {
  handleAddComment,
};

export default connect(null, mapDispatchToProps)(AddComment);