import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Categories from './Categories';
import PostsList from './PostsList';
import AddPostBtn from './AddPostBtn';

class AllPosts extends Component {
  render() {
    const {posts} = this.props;
    return (
      <Fragment>
        <Categories />
        <AddPostBtn />
        <PostsList posts={posts} />
      </Fragment>
    )
  }
}

/**
 * The mapStateToProps function - get the state parts that AllPosts component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.posts - The  posts slice of the state 
 * @returns {object} An object containing  posts {array} 
 */
 const mapStateToProps = ({ posts }) => ({
  posts: Object.values(posts),
});


export default connect(mapStateToProps)(AllPosts);