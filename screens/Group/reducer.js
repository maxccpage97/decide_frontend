import moment from 'moment'
import { SET_GROUP } from './constants'

const initialState = {
  group: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUP:
      return {
        ...state,
        group: action.payload,
      }
  }
  return state
}
