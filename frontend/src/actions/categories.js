// Variables to hold action type
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';

/**
 * Action creator - receiveCategories
 * @param {object} categories - The categories slice of the state
 * @returns {object} The action object
 */
export function receiveCategories(categories) {
  return {
    type: RECEIVE_CATEGORIES,
    categories,
  };
}