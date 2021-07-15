import React, { Fragment } from 'react';
import Post from './Post';

function PostsList(props) {
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
          : <p className="no-posts">
            There is no posts in this category.
            </p>
      }
    </Fragment>
  )
}

export default PostsList;