import {
  GET_OPTIONS,
  SET_OPTIONS,
  SET_SELECTED_OPTIONS,
  CLEAR_PICK_STATE,
} from './constants'

export const getOptions = group => {
  return {
    type: GET_OPTIONS,
    payload: group,
  }
}

export const setOptions = options => {
  return {
    type: SET_OPTIONS,
    payload: options,
  }
}

export const setSelectedOptions = selected => {
  return {
    type: SET_SELECTED_OPTIONS,
    payload: selected,
  }
}

export const clearPickState = () => {
  return {
    type: CLEAR_PICK_STATE,
  }
}
