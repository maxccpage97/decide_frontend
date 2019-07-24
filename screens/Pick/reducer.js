import moment from 'moment'
import {
  GET_OPTIONS,
  SET_OPTIONS,
  SET_SELECTED_OPTIONS,
  CLEAR_PICK_STATE,
} from './constants'
import _ from 'lodash'

const initialState = {
  isLoading: false,
  options: null,
  selectedOptions: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_OPTIONS:
      return {
        ...state,
        isLoading: true,
      }
    case SET_OPTIONS:
      return {
        ...state,
        options: action.payload.length <= 4 ? [] : action.payload,
        isLoading: false,
      }
    case SET_SELECTED_OPTIONS:
      return {
        ...state,
        selectedOptions: action.payload,
      }
    case CLEAR_PICK_STATE:
      return {
        ...state,
        isLoading: false,
        selectedOptions: [],
      }
  }
  return state
}
