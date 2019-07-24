import { SET_GROUP } from './constants'

export const setGroup = group => {
  return {
    type: SET_GROUP,
    payload: group,
  }
}
