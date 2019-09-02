import moment from 'moment'
import { SET_SELECTED_CATEGORIES, CLEAR_CATEGORIES } from './constants'

const initialState = {
  selectedCategories: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORIES:
      return {
        ...state,
        selectedCategories: action.payload,
      }
    case CLEAR_CATEGORIES:
      return {
        ...state,
        selectedCategories: [],
      }
  }
  return state
}
