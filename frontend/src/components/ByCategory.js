import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { sortBy } from '../utils/helper';
import Categories from './Categories';
import PostsList from './PostsList';
import AddPostBtn from './AddPostBtn';
import SortBy from './SortBy';

class ByCategory extends Component {
  state={
    sortOption: 'timestamp-desc'
  }
  /**
   * Update ths state with the sorte option
   */
  handleSorting = value => this.setState({sortOption: value});
  
  render() {
    const { sortOption } = this.state;
    // Sort posts depending on user's option
    const posts = sortBy(this.props.posts, sortOption);
    return (
      <Fragment>
        <Categories />
        <AddPostBtn />
        <SortBy handleSorting={this.handleSorting} />
        <PostsList posts={posts} />
      </Fragment>
    )

  }
}

/**
 * The mapStateToProps function - get the state parts that ByCategory component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.posts - The  posts slice of the state 
 * @param {Object} props - The component's ownProps
 * @returns {object} An object containing  posts {array} filtered by category 
 */
 const mapStateToProps = ({ posts }, props) => {
  const { category } = props.match.params;
  return {
    posts: Object.values(posts).filter(post => post.category === category),
  }
  
};
export default connect(mapStateToProps)(ByCategory);