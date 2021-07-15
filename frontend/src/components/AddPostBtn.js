import React from 'react';
import { withRouter } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

function AddPostBtn(props) {

  /**
   * Redirect the user to add post page
   * @param {object} e - The event object 
   */
  const goToaddNewPost = e => {
    e.preventDefault();
    const { history } = props;
    history.push('/posts/add');
  };  
  
  return (
    <div className="add-post-btn-wrapper">
      <button onClick={goToaddNewPost}>
        <MdAdd className="add-post-icon" />Add New Post
      </button>
    </div>
  )
}

export default  withRouter(AddPostBtn);