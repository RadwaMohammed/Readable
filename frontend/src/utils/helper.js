/**
 * Function formatDate
 * @param {number} timestamp - time
 * @returns formated date 
 */
 export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString('en-US');
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

/**
 * Function gaenerateUID
 * @returns random string id
 */
export function generateUID() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

/**
 * Function formatPost  
 * @param {Object} post - The post object
 * @param {string} post.body 
 * @param {string} post.title 
 * @param {string} post.author 
 * @param {string} post.category 
 * @returns formated post object
 */
export function formatPost({ body, title, author, category }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    title,
    body,
    author,
    category,
    voteScore: 1,
    deleted: false,
    commentCount: 0
  };
}

/**
 * Function formatComment 
 * @param {Object} comment - The comment object
 * @param {string} comment.body 
 * @param {string} comment.author 
 * @param {string} comment.parentId
 * @returns formated comment object
 */
export function formatComment({ body, author, parentId }) {
  return {
    id: generateUID(),
    timestamp:Date.now(),
    body,
    author,
    parentId,
    voteScore: 1,
    deleted: false,
    parentDeleted: false
  };
}

/**
 * Function sortBy
 * @param {array} arr - The array to be sorted
 * @param {string} option - The user's option that array'll be sorted by
 * @returns An array sorted depending on user selection
 */
export function sortBy(arr, option) {
  const [prop, order] = option.split('-'); 
  return arr.sort((a, b) => order === 'asc' 
    ? a[prop] - b[prop] 
    : b[prop] - a[prop]
  );
}