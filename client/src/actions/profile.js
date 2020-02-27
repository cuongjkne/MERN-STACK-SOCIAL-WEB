import axios from 'axios';

import { setAlert } from './alert';
import {
  PROFILE_ERROR,
  GET_PROFILE,
  UPDATE_PROFILE,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_REPOS
} from './types';

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Create or update profile
export const createOrEditProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };
  try {
    const res = await axios.post('/api/profile', formData, config);
    if (edit) {
      // edit profile
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    } else {
      // create profile
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      history.push('/dashboard');
    }

    dispatch(
      setAlert(edit ? 'Profile is updated' : 'Created successfully', 'success')
    );
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Add an experience or Education
export const addExOrEdu = (formData, history, field) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  };

  try {
    if (field === 'Experience') {
      const res = await axios.put('/api/profile/experience', formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    }
    if (field === 'Education') {
      const res = await axios.put('/api/profile/education', formData, config);
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      });
    }
    dispatch(setAlert('Added successfully', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Delete experience and education
export const deleteExOrEdu = (id, field) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/${field}/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Deleted successfully', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? I will miss you so much ')) {
    try {
      await axios.delete('/api/profile');
      dispatch({
        type: CLEAR_PROFILE
      });
      dispatch({
        type: ACCOUNT_DELETED
      });

      dispatch(setAlert('Your account has been deleted'));
    } catch (error) {
      const errors = error.response.data.errors;

      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
};

// GET ALL PROFILE USERS
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// GET A PROFILE USER BY ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId} `);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
// GET GITHUB REPOS
export const getRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username} `);
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
