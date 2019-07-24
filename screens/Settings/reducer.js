import moment, { locale } from 'moment'
import {
  SET_LOCATION,
  SET_RADIUS,
  UPDATE_SETTINGS,
  SET_TIME_OPTION,
  SET_TIME_VALUE,
} from './constants'
import { SET_USER_PROFILE } from '../Settings/constants'
import _ from 'lodash'

const initialState = {
  location: undefined,
  radius: 10000,
  timeOption: 0,
  timeValue: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      }
    case SET_RADIUS:
      return {
        ...state,
        radius: action.payload,
      }
    case SET_TIME_OPTION:
      return {
        ...state,
        timeOption: action.payload,
        timeValue: action.payload === 0 ? null : state.timeValue,
      }
    case SET_TIME_VALUE:
      return {
        ...state,
        timeValue: moment(action.payload).valueOf(),
        timeOption: 1,
      }
    case UPDATE_SETTINGS:
      const { location, radius, timeOption, timeValue } = action.payload
      return {
        ...state,
        location,
        radius,
        timeOption,
        timeValue,
      }
  }
  return state
}
