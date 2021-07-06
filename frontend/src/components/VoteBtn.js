import React, {Fragment} from 'react';
import { FaChevronUp, FaChevronDown} from "react-icons/fa";

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
      <button onClick={() => vote('upVote')}><FaChevronUp /></button>
        { props.children }
      <button onClick={() => vote('downVote')}><FaChevronDown /></button>
    </Fragment>
  )
}
export default VoteBtn;