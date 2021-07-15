import React from 'react';
import { withRouter } from 'react-router-dom';
import { MdAdd } from "react-icons/md";


function AddPostBtn(props) {
  const addNewPost = e => {
    e.preventDefault();
    const { history } = props;
    history.push('/posts/add');
  };
  
  return (
    <div className="add-post-btn-wrapper">
      <button onClick={addNewPost}><MdAdd className="add-post-icon" />Add New Post</button>
    </div>
  )
}
export default  withRouter(AddPostBtn);