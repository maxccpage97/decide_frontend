import {
  GET_DECISION,
  SET_DECISION,
  HANDLE_DECISION,
  CLEAR_DECISION,
  HANDLE_DECLINE,
} from './constants'

export const getDecision = params => {
  return {
    type: GET_DECISION,
    payload: params,
  }
}

export const setDecision = params => {
  return {
    type: SET_DECISION,
    payload: params,
  }
}

export const handleDecision = listing => {
  return {
    type: HANDLE_DECISION,
    payload: listing,
  }
}

export const handleDecline = listing => {
  return {
    type: HANDLE_DECLINE,
    payload: listing,
  }
}

export const clearDecision = () => {
  return {
    type: CLEAR_DECISION,
  }
}
