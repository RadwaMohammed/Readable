import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddComment } from '../actions/comments';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddComment extends Component {
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
    return (
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
    )
  }
}
/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleAddComment> ction creator
 */
 const mapDispatchToProps = {
  handleAddComment,
};


export default connect(null, mapDispatchToProps)(AddComment);