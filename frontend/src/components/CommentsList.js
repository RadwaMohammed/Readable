import React, { Fragment } from 'react';
import Comment from './Comment';

export default function CommentsList(props) {
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
          : <p>There is no comments</p>
        }


    </Fragment>
  )
}
