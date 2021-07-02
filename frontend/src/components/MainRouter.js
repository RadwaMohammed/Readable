import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllPosts from './AllPosts';
import ByCategory from './ByCategory';
import PostDetails from './PostDetails';
import AddPost from './AddPost';
import NotFound from './NotFound';
import Header from './Header'

class MainRouter extends Component {
  render() {
    const { categoryPath } = this.props;
    return (
      <Router>
        <Header />
        <Switch>
          <Route exact path='/' component={AllPosts} />
          <Route exact path={`/:category(${categoryPath})`} component={ByCategory} />
          <Route exact path={`/:category(${categoryPath})/:post_id`} component={PostDetails} />
          <Route exact path='/posts/add' component={AddPost} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    )
  }
}

export default MainRouter;