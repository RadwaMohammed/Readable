import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PostDetails from './PostDetails';
import AddPost from './AddPost';
import NotFound from './NotFound';
import Header from './Header'
import PostsView from './PostsView';

class MainRouter extends Component {
  render() {
    const { categoryPath } = this.props;
    return (
      <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={PostsView} />
            <Route exact path={`/:category(${categoryPath})`} component={PostsView} />
            <Route exact path={`/:category(${categoryPath})/:post_id`} component={PostDetails} />
            <Route exact path='/posts/add' component={AddPost} />
            <Route component={NotFound} />
          </Switch>
      </Router>
    )
  }
}

export default MainRouter;