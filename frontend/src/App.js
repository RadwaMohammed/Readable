import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';

class App extends Component {
  componentDidMount() {
    /* When component mounts load the initial data 
       by dispatching the handleInitialData() action creator
    */
    this.props.handleInitialData()
  }
  render() {
    return (
      <div>
        Hello ^_^
      </div>
    )
  }
}

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleInitialData> ction creator
 */
 const mapDispatchToProps = {
  handleInitialData
};

export default connect(null, mapDispatchToProps)(App); 