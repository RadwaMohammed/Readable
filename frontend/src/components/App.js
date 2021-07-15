import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';
import { handleInitialData } from '../actions/shared';
import MainRouter from './MainRouter';
import Container from 'react-bootstrap/Container';
import LoadingSpinner from './LoadingSpinner';

class App extends Component {
  componentDidMount() {
    /* When component mounts load the initial data 
       by dispatching the handleInitialData() action creator
    */
    this.props.handleInitialData()
  }
  render() {
    const { isLoading, categoryPath } = this.props;
    return isLoading 
      ? 
      <Fragment>
        <LoadingBar 
          updateTime={200} 
          maxProgress={100} 
          progressIncrease={100} 
          style={{ backgroundColor: '#415a6b', height: '5px' }} 
        />
        <LoadingSpinner />
      </Fragment>
      :
        <Fragment>
          <LoadingBar 
            updateTime={200} 
            maxProgress={100} 
            progressIncrease={100} 
            style={{ backgroundColor: '#415a6b', height: '5px' }} 
          />
          <Container className="app-container">
            <MainRouter categoryPath={categoryPath} />
          </Container>
        </Fragment>
  }
}

/**
 * The mapStateToProps function - get the state parts that App component needs
 * @param {Object} state - The state of the store 
 * @param {object} state.categories - The categories slice of the state 
 * @returns {object} An object containing 
 *                    isLoading {boolean} indicate if the data is loaded
 *                    categoryPath {string} all possible category path
 *                    
 */
 const mapStateToProps = ({ categories, loadingBar }) => {
  const catePathArr = Object.values(categories).map(category => category.path);
  return {
    isLoading: !!loadingBar.default,
    categoryPath: catePathArr.join('|') 
  }
};

/**
 * The mapDispatchToProps as an object - dispatching actions to the store
 * <handleInitialData> action creator
 */
const mapDispatchToProps = {
  handleInitialData
};

export default connect(mapStateToProps, mapDispatchToProps)(App);