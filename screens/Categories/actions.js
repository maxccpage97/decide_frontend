import { SET_SELECTED_CATEGORIES, CLEAR_CATEGORIES } from './constants'

export const setSelectedCategories = categories => {
  return {
    type: SET_SELECTED_CATEGORIES,
    payload: categories,
  }
}

export const clearCategories = () => {
  return {
    type: CLEAR_CATEGORIES,
  }
}
