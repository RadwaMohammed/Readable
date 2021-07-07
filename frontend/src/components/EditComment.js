import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class EditComment extends Component {
  state={
    comment: this.props.comment.body,
  }
  /**
   * Handle the change on the input text 
   * in the edit form
   * @param {e} e - event object 
   */
   handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };
   /**
   * Handle the submit to add new post
   * @param {object} e - The event object 
   */
  handleSubmit = e => {
    const { comment: body } = this.state;
    const { handleEdit, comment} = this.props;
    const editedComment = { ...comment, body, timestamp: Date.now()};
    e.preventDefault();
    handleEdit(comment.id, editedComment);
  }
  render() {
    const { comment } = this.state;
    const { hide } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="comment">
          <Form.Control 
            as="textarea" 
            rows={2}  
            placeholder="Type Your Comment"
            value={comment}
            onChange={this.handleChange}
          />
        </Form.Group>
        
        <Button variant="secondary" onClick={()=> hide()}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          type="submit"
          disabled={!comment.trim()}
        >
          Save
        </Button>
        
      </Form>
    )
  }
}
