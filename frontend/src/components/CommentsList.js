import React, { Fragment } from 'react';
import Comment from './Comment';

export default function CommentsList(props) {
  const { comments } = props;
  return (
    <Fragment>
      {
        comments.length
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
