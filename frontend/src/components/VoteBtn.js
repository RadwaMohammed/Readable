import React, { Fragment } from 'react';
import { 
  MdArrowDropUp,
  MdArrowDropDown
} from 'react-icons/md';

function VoteBtn(props) {

  /**
   * Handle voting buttons
   * @param {string} option - user's vote upVote or downVote
   */
   const vote = option => {
    const { id, handleVote} = props;
    handleVote(id, option);
  }

  return (
    <Fragment>
      <button className="vote-icon-wrapper" onClick={() => vote('upVote')}>
        <MdArrowDropUp className="vote-icon" />
      </button>
        { props.children }
      <button className="vote-icon-wrapper" onClick={() => vote('downVote')}>
        <MdArrowDropDown className="vote-icon" />
      </button>
    </Fragment>
  )
}

export default VoteBtn;