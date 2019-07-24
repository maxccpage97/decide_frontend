import moment from 'moment'
import {
  GET_USER_PROFILE,
  SET_USER_PROFILE,
  SET_INITIAL_CONFIG,
} from './constants'

const initialState = {
  userProfile: null,
  currentLocation: null,
  google_token: null,
  yelp_token: null,
  date: moment().format(),
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_INITIAL_CONFIG:
      const {
        userProfile,
        currentLocation,
        google_token,
        yelp_token,
      } = action.payload
      return {
        ...state,
        userProfile,
        currentLocation,
        google_token,
        yelp_token,
      }
    case SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      }
  }
  return state
}
