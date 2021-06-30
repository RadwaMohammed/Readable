import { 
  RECEIVE_POSTS,
  ADD_POST,
  RE_ADD_POST, 
  EDIT_POST, 
  DELETE_POST, 
  VOTE_POST, 
  RESET_VOTE_POST, 
  COMMENT_COUNTER
} from '../actions/posts';


/**
 * Reducer function <posts>  
 * @param {object} state - The current state
 * @param {object} action - The action that occured
 * @returns {object}  The new state
 */
export default function posts(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        ...action.posts,
      };
    
    case ADD_POST:
    case EDIT_POST:
      return {
        ...state,
        [action.post.id]: action.post
      };
    
    case RE_ADD_POST:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: false
        }
      };  
    
    case DELETE_POST: 
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        deleted: true
      }
    };  

    case VOTE_POST: 
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote' 
            ? state[action.id].voteScore + 1
            : state[action.id].voteScore - 1
        }
      };

    case RESET_VOTE_POST: 
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        voteScore: action.option === 'upVote' 
          ? state[action.id].voteScore - 1
          : state[action.id].voteScore + 1
      }
    };

    case COMMENT_COUNTER: 
      return {
        ...state,
        [action.id]: {
            ...state[action.id],
            commentCount: state[action.id].commentCount + action.count
        }
      };

    default:
      return state;
  }
}