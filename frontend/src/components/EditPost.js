import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export default class EditPost extends Component {
  state={
    title: this.props.post.title,
    body: this.props.post.body,
    categoryName: this.props.post.category,
  }
  /**
   * Handle the change on the input text 
   * in the edit post form
   * @param {e} e - event object 
   */
   handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
   /**
   * Handle the submit to edit post
   * @param {object} e - The event object 
   */
  handleSubmit = e => {
    const { categoryName: category, title, body } = this.state;
    const { handleEdit, post } = this.props;
    const editedPost = { ...post, category, title, body, timestamp: Date.now()};
    console.log(editedPost)
    e.preventDefault();
    handleEdit(editedPost);
    
  }
  render() {
    const { 
      show, 
      hide, 
      categories
    } = this.props;
    const {
      title,
      body,
      categoryName
    } = this.state;
    const isEmpty = Object.values(this.state).some(val => !val.trim());
    return (
      <Modal
        show={show}
        onHide={hide}
        backdrop="static"
        keyboard={false}
        centered
        className="edit-post-modal"
      >
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header>
            <Modal.Title>Edit post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                {
                  categories.map(category => 
                    <Form.Check
                      type="radio"
                      label={category.name}
                      id={category.name}
                      key={category.name}
                      value={category.name}
                      name="categoryName"
                      checked={categoryName === category.name}
                      onChange={this.handleChange}
                    />)
                }
              </Form.Group>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Type the title"
                  value={title} 
                  name="title"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={5}  
                  placeholder="Type the content"
                  value={body} 
                  name="body"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <p className="not-empty">
                {isEmpty ? 'All input fields must be filled out.' : ''}
              </p>
          </Modal.Body>
          <Modal.Footer>
            <button 
              type="submit"
              // Make sure that the user enter text not only white space
              disabled={isEmpty}
            >
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={()=> hide()}>Cancel</button>  
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
}
