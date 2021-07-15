import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router';
import { FaTrashAlt } from 'react-icons/fa';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

class DeleteBtn extends Component {
  state = {
    backHome: false
  }
  
  /**
  * Handle deleting post
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
        <OverlayTrigger 
          trigger='click' 
          placement='top'
          overlay={
            <Popover id="popover-positioned-top" className="delete-popover">
              <Popover.Title as="h5">Delete</Popover.Title>
              <Popover.Content>
                Are you sure?
                <br />
                <button onClick={() => document.body.click()}>No</button> 
                <button onClick={() => this.remove()}>Yes</button>
              </Popover.Content>
            </Popover>
          }
          rootClose={true}>
          <button className="delete-btn"><FaTrashAlt /> Delete</button>
        </OverlayTrigger>
        {backHome && <Redirect to="/" />}
      </Fragment>
    )
  }
}

export default DeleteBtn;