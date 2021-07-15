import React, { Component, Fragment } from 'react';
import { FaEdit } from 'react-icons/fa';
import EditPost from './EditPost';

class EditBtn extends Component {
  state = {
    show: false,
  }

  /**
   * Show Edit form
   */
  showEditModal= () => {
    const { commentEdit, showEditForm } = this.props;
    this.setState({
      show: true
    }); 
    if (commentEdit) {
      showEditForm();
    }
  }

  /**
   * Hide Edit form
   */
  hideEditModal= () => {
    this.setState({
      show: false
    });
  };
  
  /**
   *  Function to handle Editing
   * @param {object} editData - The edited data
   */
  makeEdit = editData => {
    const { id, handleEdit } = this.props;
    handleEdit(id, editData);
    this.hideEditModal();
  };

  render() {
    const { show } = this.state;
    const { currentData, categories, commentEdit } = this.props;
    return (
      <Fragment>
        <button className="edit-btn" onClick={() => this.showEditModal()}>
          <FaEdit /> Edit
        </button>
        {
          (show && !commentEdit) 
            &&
            <EditPost 
              show={show} 
              hide={this.hideEditModal} 
              post={currentData} 
              handleEdit={this.makeEdit}
              categories={categories}
            />

        }
      </Fragment>
    )
  }
}

export default EditBtn;