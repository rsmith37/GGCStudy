import { GET_EVENTS, EVENT_LOADING, GET_ERRORS } from './types';
import axios from 'axios';

// Get all events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios.get('/api/events/all')
    .then(res => 
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_EVENTS,
        payload:  []
      })  
    )
}

// Create event
export const createEvent = (eventData, history) => dispatch => {
  axios
    .post('/api/events/', eventData)
    .then(res => history.push('/groups'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Set event loading
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  }
}