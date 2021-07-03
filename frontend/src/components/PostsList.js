import React, { Fragment } from 'react';
import Post from './Post';

export default function PostsList(props) {
  const { posts } = props;
  const isAllPostsDeleted = posts.every(post => !!post.deleted);
  return (
    <Fragment>
      {
        posts.length && !isAllPostsDeleted
          ? posts.map(post => (
            <div key={post.id}>
              <Post post={post}/>
            </div>
          ))
          : <p>There is no posts</p>
      }


    </Fragment>
  )
}
