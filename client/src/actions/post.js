import axios from 'axios';
import {
  GET_POST,
  GET_POSTS,
  POST_ERROR,
  CREATE_POST,
  DELETE_POST,
  UPDATE_COMMENTS,
  UPDATE_LIKE,
} from './types';

//GET POSTS
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//GET POST BY ID
export const getPostById = id => async dispatch => {
  try {
    const res = axios.get(`/api/posts/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//CREATE A POST
export const createPost = text => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  const body = { text };

  try {
    const res = await axios.post('/api/posts', body, config);
    dispatch({
      type: CREATE_POST,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//DELETE A POST
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type: DELETE_POST,
      payload: id,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//CREATE A COMMENT
export const commentPost = (id, text) => async dispatch => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  };
  const body = { text };

  try {
    const res = await axios.post(`/api/posts/comment/:id`, body, config);
    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
//DELETE A COMMENT
export const deleteComment = (idCom, idPo) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/comment/${idPo}/${idCom}`);
    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
// Like and unlike post
export const likePost = id => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like-unlike/${id}`);

    dispatch({
      type: UPDATE_LIKE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
