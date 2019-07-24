import { SET_PERMISSIONS_DENIED, SET_SERVER_ERROR } from './constants'

const initialState = {
  isLoading: true,
  permissionsDenied: false,
  serverError: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PERMISSIONS_DENIED:
      return {
        ...state,
        permissionsDenied: true,
        isLoading: false,
      }
    case SET_SERVER_ERROR: {
      return {
        ...state,
        isLoading: false,
        serverError: true,
      }
    }
    default:
      return state
  }
}
