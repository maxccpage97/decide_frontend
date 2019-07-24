import moment from 'moment'
import {
  GET_DECISION,
  SET_DECISION,
  HANDLE_DECISION,
  CLEAR_DECISION,
} from './constants'
import _ from 'lodash'
const initialState = {
  listing: null,
  isLoading: false,
  reviews: null,
  reviewCount: null,
  accepted: false,
  isEmpty: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_DECISION:
      return {
        ...state,
        isLoading: true,
      }
    case SET_DECISION:
      const { listing, reviews, reviewCount } = action.payload
      if (_.isEmpty(listing)) {
        return {
          ...state,
          listing,
          isLoading: false,
          isEmpty: true,
        }
      }
      return {
        ...state,
        listing,
        reviews,
        reviewCount,
        isLoading: false,
      }
    case HANDLE_DECISION:
      return {
        ...state,
        accepted: true,
      }
    case CLEAR_DECISION:
      return {
        ...state,
        accepted: false,
        isEmpty: false,
      }
  }
  return state
}
