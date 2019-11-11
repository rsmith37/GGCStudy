import { GET_EVENTS, EVENT_LOADING, GET_ERRORS, GET_EVENT } from './types';
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

// Reset event state
export const resetEvents = () => dispatch => {
  dispatch(setEventLoading());
  dispatch({
    type: GET_EVENTS,
    payload: null
  })
}

// Search for events
export const searchEvents = searchData => dispatch => {
  dispatch(setEventLoading());
  console.log(searchData)
  axios
    .post('/api/events/search', searchData)
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
    .then(res => history.push('/groups/home'))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    )
}

// Get event by id
export const getEventById = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/events/${id}`)
    .then(res => 
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })  
    )
    .catch(err =>
      dispatch({
        type: GET_EVENT,
        payload: null
      })  
    )  
}

// Set event loading
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  }
}
