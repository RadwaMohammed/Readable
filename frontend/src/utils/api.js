const api = "http://localhost:3001";

// Generate a unique token for storing data on the backend server.
let token = localStorage.token;
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8);

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}


/*---------------------- Categories ----------------------*/

/**
 * Get all categories
 */
export const getAllCategories = () => 
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories);


/*---------------------- Posts ----------------------*/

/**
 * Get all posts
 */ 
export const getAllPosts = () => 
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * Get posts by its category
 * @param {string} category - The category's name 
 */
export const getPostsByCategory = category => 
  fetch(`${api}/${category}/posts`, { headers })
    .then(res => res.json())
    .then(data => data);
/**
 * Get a post
 * @param {string} id - The post's id
 */
export const getPost = id =>
   fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * Add post
 * @param {object} post - The new post object
 */
export const addPost = post => 
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
    .then(res => res.json())
    .then(data => data);

/**
 * Edit a post
 * @param {string} id - The post's id
 * @param {object} post - The updated post object
 */
 export const editPost = (id, post) => 
 fetch(`${api}/posts/${id}`, {
   method: 'PUT',
   headers: {
     ...headers,
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(post)
 })
   .then(res => res.json())
   .then(data => data);

/**
 * Delete a post 
 * @param {string} id - The post's id
 */
export const deletePost = id => 
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())
    .then(data => data);

/**
 * Vote for a post
 * @param {string} id - The post's id
 * @param {string} option - The user's vote option
 */
export const votePost = (id, option) => 
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);


/*---------------------- Comments ----------------------*/

/**
 * Get all comments for a post
 * @param {string} id - The post's id 
 */
export const getAllComments = id => 
   fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * Get a comment
 * @param {string} id - The comment's id
 */
export const getComment = id => 
  fetch(`${api}/comments/${id}`, { headers })
    .then(res => res.json())
    .then(data => data);

/**
 * Add a comment
 * @param {object} comment - The new comment object 
 */
export const addComment = comment => 
  fetch(`${api}/comments/`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data);

/**
 * Edit a coment
 * @param {string} id - The comment's id
 * @param {object} comment - The updated comment
 */
export const editComment = (id, comment) => 
  fetch(`${api}/comments/${id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
    .then(data => data);
    
/**
 * Delete a comment
 * @param {string} id - The comment's id
 */
export const deleteComment = id => 
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers
  })
    .then(res => res.json())
    .then(data => data);

/**
 * Vote for a comment  
 * @param {string} id - The comment's id
 * @param {string} option - The user's vote option 
 */
export const voteComment = (id, option) => 
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
    .then(data => data);


/*---------------------- The initial data ----------------------*/

// Get the initial data
export async function getInitialData() {
  try {
    let [categories, posts] = await Promise.all(
      [getAllCategories(), getAllPosts()]
    );
    // Convert each slice of data to an object
    categories = Object.fromEntries(categories.map(category => 
      [category.name, category])
    );
    posts = Object.fromEntries(posts.map(post => 
      [post.id, post])
    );  
    // Get all comments from its parent post's ids
    const postsIds = Object.keys(posts);
    const commentsPromises = postsIds.map(async postId => 
      await getAllComments(postId)
    );
    let comments = await Promise.all(commentsPromises);
    
    // Convert to object
    comments = Object.fromEntries(comments.flat().map(comment => 
      [comment.id, comment])
    );
    return ({ categories, posts, comments });
  }
  catch (error) {
    console.error('Error:', error);
  }
}