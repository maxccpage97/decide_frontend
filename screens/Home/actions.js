import { SET_PERMISSIONS_DENIED, SET_SERVER_ERROR } from './constants'

export const setPermissionsDenied = () => {
  return {
    type: SET_PERMISSIONS_DENIED,
  }
}

export const setServerError = () => {
  return {
    type: SET_SERVER_ERROR,
  }
}
