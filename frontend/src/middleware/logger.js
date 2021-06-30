/**
 * Logs the actions and states after they are dispatched 
 */
 const logger = store => next => action => {
  console.group(action.type);
    // Log the action
    console.log('The action: ', action);
    const returnValue = next(action);
    // Log the new state after action dispatched
    console.log('The new state: ', store.getState());
  console.groupEnd();
  return returnValue;
};

export default logger;