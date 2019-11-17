import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';

import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER } from './types';

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());

  axios.get('/api/profile/')
    .then(res => 
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch(err => 
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}

// Create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile/', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Delete account & profile
export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure? This action CAN NOT be undone!')) {
   axios
    .delete('/api/profile')
    .then(res => 
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
    )
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
    
    // Remove profile from state
    dispatch(clearCurrentProfile());
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
  }
}

// Get profile by username
export const getProfileByUsername = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })  
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}

// Get profile by user id
export const getProfileByUserID = user => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/user/${user}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })  
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    )
}

// Set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// Clear profile such as when logging out
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}