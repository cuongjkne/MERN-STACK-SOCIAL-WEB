import axios from 'axios';

import { setAlert } from './alert';
import {
  PROFILE_ERROR,
  GET_PROFILE,
  ADD_SUCCESSFULLY,
  EDIT_PROFILE_SUCCESSFULLY,
  CREATE_PROFILE_SUCCESSFULLY
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
      dispatch({
        type: EDIT_PROFILE_SUCCESSFULLY,
        payload: res.data
      });
    } else {
      dispatch({
        type: CREATE_PROFILE_SUCCESSFULLY,
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
        type: ADD_SUCCESSFULLY,
        payload: res.data
      });
    }
    if (field === 'Education') {
      const res = await axios.put('/api/profile/education', formData, config);
      dispatch({
        type: ADD_SUCCESSFULLY,
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
