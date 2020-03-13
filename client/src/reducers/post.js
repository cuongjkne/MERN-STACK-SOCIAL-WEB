import {
  GET_POSTS,
  POST_ERROR,
  GET_POST,
  DELETE_POST,
  CLEAR_POST,
  CREATE_POST,
  UPDATE_COMMENTS,
  UPDATE_LIKE,
} from '../actions/types';

const initialState = {
  post: null,
  posts: [],
  loading: true,
  error: {},
};

export default function(state = initialState, action) {
  let { type, payload } = action;

  switch (type) {
    case DELETE_POST:
      payload = state.posts.filter(post => post._id !== payload);

    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case CREATE_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false,
      };
    case UPDATE_COMMENTS:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case UPDATE_LIKE:
      const id = state.posts.findIndex(post => post._id === payload._id);
      state.posts[id] = payload;
      return {
        ...state,
        posts: state.posts,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case CLEAR_POST:
      return {
        ...state,
        post: null,

        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
// TODO: COMMENT POST
