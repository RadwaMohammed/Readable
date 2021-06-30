import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './logger';

// Middleware function passing it thunk and logger middlewares
export default applyMiddleware(
  thunk, // Allows writing action creators that return functions rather than objects
  logger, // Log out the state and action
);