import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { sortBy } from '../utils/helper';
import Categories from './Categories';
import AddPostBtn from './AddPostBtn';
import SortBy from './SortBy';
import PostsList from './PostsList';

class PostsView extends Component {
  state={
    sortOption: 'timestamp-desc'
  }

  /**
   * Update the state with the user's sort option
   * @param {string} value - The sort option value
   */
  handleSorting = value => this.setState({sortOption: value});

  render() {
    const { sortOption } = this.state;
    const { posts } = this.props;
    // Sort posts depending on user's option
    const sortedPosts = sortBy(posts, sortOption);

    return (
      <Fragment>
        <Categories />
        <AddPostBtn />
        <div className="posts-list-wrapper">
          <SortBy handleSorting={this.handleSorting} />
          <PostsList posts={sortedPosts} />
        </div>
      </Fragment>
    )
  }
}

/**
 * The mapStateToProps function - get the state parts that PostsView component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.posts - The  posts slice of the state 
 * @param {Object} props - The component's ownProps
 * @returns {object} An object containing  posts {array}
 */
 const mapStateToProps = ({ posts }, props) => {
  const { category } = props.match.params;
  const AllPosts = Object.values(posts);
  const myPosts = category 
    ? AllPosts.filter(post => post.category === category) 
    : AllPosts;
  return {
    posts: myPosts,
  }
};

export default connect(mapStateToProps)(PostsView);