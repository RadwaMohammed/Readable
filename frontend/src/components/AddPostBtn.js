import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FaPlus} from "react-icons/fa";


function AddPostBtn(props) {
  const addNewPost = e => {
    e.preventDefault();
    const { history } = props;
    history.push('/posts/add');
  };

  return (
    <Button variant="success" onClick={addNewPost}><FaPlus />  Add New Post</Button>
  )
}
export default  withRouter(AddPostBtn);