import { SET_SELECTED_CATEGORIES } from './constants'

export const setSelectedCategories = categories => {
  return {
    type: SET_SELECTED_CATEGORIES,
    payload: categories,
  }
}
