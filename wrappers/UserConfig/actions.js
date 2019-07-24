import {
  GET_USER_PROFILE,
  SET_USER_PROFILE,
  GET_INITIAL_CONFIG,
  SET_INITIAL_CONFIG,
} from './constants'

export const getInitialConfig = params => {
  return {
    type: GET_INITIAL_CONFIG,
    payload: params,
  }
}

export const setInitialConfig = params => {
  return {
    type: SET_INITIAL_CONFIG,
    payload: params,
  }
}

export const getUserProfile = params => {
  return {
    type: GET_USER_PROFILE,
    payload: params,
  }
}

export const setUserProfile = params => {
  return {
    type: SET_USER_PROFILE,
    payload: params,
  }
}
