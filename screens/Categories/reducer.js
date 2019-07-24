import moment from 'moment'
import { SET_SELECTED_CATEGORIES } from './constants'

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
  }
  return state
}
