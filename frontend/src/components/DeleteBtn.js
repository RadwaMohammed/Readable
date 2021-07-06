import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import { FaTrashAlt } from "react-icons/fa";



class DeleteBtn extends Component {
  state = {
    backHome: false
  }
  /**
  * Handle deletiong post
  */
 remove = () => {
  const { handleDelete, id, redirectHome } = this.props;
  handleDelete(id);
  if (redirectHome) {
    this.setState({
      backHome: true
    })
  }
  
}
  render() {
    const { backHome } = this.state;
    return (
      <Fragment>
        <button onClick={() => this.remove()}><FaTrashAlt /></button>
        {backHome && <Redirect to="/" />}
      </Fragment>
    )
  }
}

export default DeleteBtn;