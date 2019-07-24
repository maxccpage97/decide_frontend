import {
  SET_LOCATION,
  SET_RADIUS,
  SET_TIME_VALUE,
  SET_TIME_OPTION,
  UPDATE_SETTINGS,
} from './constants'

export const setLocation = location => {
  //This will be obj = { coords: { lat, lng }, address: string }
  return {
    type: SET_LOCATION,
    payload: location,
  }
}

export const setRadius = radius => {
  //This will be int
  return {
    type: SET_RADIUS,
    payload: radius,
  }
}

export const setTimeOption = time => {
  return {
    type: SET_TIME_OPTION,
    payload: time,
  }
}
export const setTimeValue = time => {
  return {
    type: SET_TIME_VALUE,
    payload: time,
  }
}

export const updateSettings = settings => {
  return {
    type: UPDATE_SETTINGS,
    payload: settings,
  }
}
