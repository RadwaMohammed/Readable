import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { handleAddPost } from '../actions/posts';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



class AddPost extends Component {
  state = {
    author: '',
    categoryName: '',
    title: '',
    body: '',
  };

  /**
   * Handle the change on the input text 
   * in the add new post form
   * @param {e} e - event object 
   */
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  /**
   * Handle the submit to add new post
   * @param {object} e - The event object 
   */
  handleSubmit = e => {
    const { author, categoryName: category, title, body } = this.state;
    const { handleAddPost, history } = this.props;
    const post = { author, category, title, body };
    e.preventDefault();
    handleAddPost(post);
    this.setState({
      author: '',
      categoryName: '',
      title: '',
      body: '',
    });
    history.push('/');
  }
  
  render() {
    const { categories } = this.props;

    const { 
      author, 
      categoryName, 
      title, 
      body 
    } = this.state;

    const isEmpty = Object.values(this.state).some(val => !val.trim());
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter Your Name"
            value={author} 
            name="author"  
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="category">
          <Form.Label>Choose a category</Form.Label>
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
            placeholder="Type a title"
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
        <Button 
          variant="primary" 
          type="submit"
          // Make sure that the user enter text not only white space
          disabled={isEmpty}
        >
          Create a Post
        </Button>
      </Form>
    )
  }
}

/**
 * The mapStateToProps function - get the state parts that AddPost component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.categories - The categories slice of the state 
 * @returns {object} An object containing categories {array} 
 */
 const mapStateToProps = ({ categories }) => ({
  categories: Object.values(categories),
});

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleAddPost> ction creator
 */
 const mapDispatchToProps = {
  handleAddPost
};


export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
