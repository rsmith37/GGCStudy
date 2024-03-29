import { GET_EVENTS, EVENT_LOADING, GET_EVENT } from '../actions/types';

const initialState = {
  event: null,
  events: null,
  eventLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case EVENT_LOADING:
      return {
        ...state,
        eventLoading: true
      };
    case GET_EVENTS: 
      return {
        ...state,
        events: action.payload,
        eventLoading: false
      };
    case GET_EVENT: 
      return {
        ...state,
        event: action.payload,
        eventLoading: false
      };
    default:
      return state;
  }
}