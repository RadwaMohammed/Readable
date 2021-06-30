import { 
  RECEIVE_COMMENTS,
  ADD_COMMENT,
  RE_ADD_COMMENT, 
  EDIT_COMMENT, 
  DELETE_COMMENT, 
  VOTE_COMMENT, 
  RESET_VOTE_COMMENT, 
  DELETE_COMMENT_PARENT,
  ADD_COMMENT_PARENT 
} from '../actions/comments';


/**
 * Reducer function <comments>  
 * @param {object} state - The current state
 * @param {object} action - The action that occured
 * @returns {object}  The new state
 */
export default function comments(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {
        ...state,
        ...action.comments,
      };
    
    case ADD_COMMENT:
    case EDIT_COMMENT:
      return {
        ...state,
        [action.comment.id]: action.comment
      };
    
    case RE_ADD_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          deleted: false
        }
      };  
    
    case DELETE_COMMENT: 
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        deleted: true
      }
    };  

    case VOTE_COMMENT: 
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          voteScore: action.option === 'upVote' 
            ? state[action.id].voteScore + 1
            : state[action.id].voteScore - 1
        }
      };

    case RESET_VOTE_COMMENT: 
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        voteScore: action.option === 'upVote' 
          ? state[action.id].voteScore - 1
          : state[action.id].voteScore + 1
      }
    };

    case DELETE_COMMENT_PARENT: 
      const deletedParent = Object.values(state).map(comment => {
        comment.parentDeleted = comment.parentId === action.id;
        return comment;
      });
      
      return {
        ...state,
        ...Object.fromEntries(deletedParent.map(comment => 
          [comment.id, comment]))
      };

    case ADD_COMMENT_PARENT: 
      const addedParent = Object.values(state).map(comment => {
        comment.parentDeleted = comment.parentId !== action.id;
        return comment;
      });
      
      return {
        ...state,
        ...Object.fromEntries(addedParent.map(comment => 
          [comment.id, comment]))
      };

    default:
      return state;
  }
}