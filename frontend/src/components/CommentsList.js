import React, { Fragment } from 'react';
import Comment from './Comment';

function CommentsList(props) {
  const { comments } = props;
  const isAllcommentsDeleted = comments.every(comment => !!comment.deleted);
  return (
    <Fragment>
      {
        comments.length && !isAllcommentsDeleted
          ? comments.map(comment => (
            <div key={comment.id}>
              <Comment comment={comment}/>
            </div>
          ))
          : <p className="no-comments">There is no comments in this post.</p>
      }
    </Fragment>
  )
}

export default  CommentsList;