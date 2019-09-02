import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
  GET_INITIAL_CONFIG,
  GET_USER_PROFILE,
} from '../wrappers/UserConfig/constants'
import {
  setInitialConfig,
  setUserProfile,
} from '../wrappers/UserConfig/actions'
import { setServerError } from '../screens/Home/actions'
import _ from 'lodash'
import { UPDATE_SETTINGS } from '../screens/Settings/constants'
import axios from 'axios'
import { setLocation } from '../screens/Settings/actions'
import {
  GET_DECISION,
  HANDLE_DECISION,
  ADD_IMPRESSION,
} from '../screens/Decision/constants'
import { setDecision } from '../screens/Decision/actions'

const LOCAL_URL = 'http://localhost:3001'

const PROD_URL = 'https://decide-server.herokuapp.com'

function* getProfile(deviceId, deviceType) {
  try {
    const response = yield axios.get(`${PROD_URL}/users?deviceId=${deviceId}`)
    if (_.isEmpty(response.data)) {
      const newUser = yield call(createProfile, deviceId, deviceType)
      return newUser
    }
    return _.first(response.data)
  } catch (e) {
    return e
  }
}

function* createProfile(deviceId, deviceType) {
  const params = JSON.stringify({ deviceId, deviceType })
  const headers = {
    Accept: 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/json',
  }

  try {
    const response = yield axios.post(`${PROD_URL}/users`, params, {
      headers: headers,
    })
    return response.data
  } catch (e) {
    return e
  }
}

function* getApiKey(type) {
  try {
    const response = yield axios.get(`${PROD_URL}/keys?type=${type}`)
    return _.first(response.data).value
  } catch (e) {
    yield put(setServerError())
    console.error(`${e} There was an error retrieving the api key`)
  }
}

function* getInitialConfig(action) {
  const { deviceId, deviceType, latitude, longitude } = action.payload
  try {
    const userProfile = yield call(getProfile, deviceId, deviceType)
    const currentLocation = { latitude, longitude }
    const google_token = yield call(getApiKey, 'google')
    const yelp_token = yield call(getApiKey, 'yelp')

    yield put(
      setInitialConfig({
        userProfile,
        currentLocation,
        google_token,
        yelp_token,
      })
    )
  } catch (e) {
    yield put(setServerError())
    console.error(` There was am error getting the inital config ${e}`)
  }
}

function* getUserProfile(action) {
  const deviceId = action.payload
  try {
    const response = yield axios.get(`${PROD_URL}/users?deviceId=${deviceId}`)
    yield put(setUserProfile(_.first(response.data)))
  } catch (e) {
    console.error(`There was an error getting user profile in settings ${e}`)
  }
}

function* updateSettings(action) {
  const { _id, settings } = action.payload
  const params = { _id, settings }
  try {
    if (_id && settings) {
      const response = yield axios.put(`${PROD_URL}/users/settings`, {
        data: params,
      })
    }
  } catch (e) {
    yield put(setServerError())
    console.error(`${e} There was an error updating user settings`)
  }
}

function* getBussinesses(params) {
  const { key, longitude, latitude, radius, openAt, openNow, options } = params
  console.log(options)
  try {
    const response = yield axios.get(
      `${PROD_URL}/options/?open_now=${openNow}&open_at=${openAt}&categories=${options}&key=${key}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
    )
    const {
      data: { businesses },
    } = response

    return _.sample(businesses)
  } catch (e) {
    console.error(`${e} There was an error getting restaurnts`)
  }
}

function* getReviewsOnBusiness(key, id) {
  try {
    const response = yield axios.get(`${PROD_URL}/reviews/?id=${id}&key=${key}`)
    const {
      data: { reviews, total },
    } = response

    return { reviews, reviewCount: total }
  } catch (e) {
    yield put(setServerError())
    console.error(`${e} There was an error getting reviews`)
  }
}

function* getBussinessInformation(key, id) {
  try {
    const response = yield axios.get(
      `${PROD_URL}/business/?id=${id}&key=${key}`
    )
    const { data } = response

    return data
  } catch (e) {
    yield put(setServerError())
    console.error(`${e} There was an error getting more info on the business `)
  }
}

function* getDecison(action) {
  const {
    key,
    coords: { latitude, longitude },
    radius,
    time,
    hasCategories,
    options,
  } = action.payload

  const openNow = time.timeOption === 0
  const openAt = time.timeValue ? time.timeValue * 1000 : null

  const business = yield call(getBussinesses, {
    key,
    longitude,
    latitude,
    radius,
    openAt,
    openNow,
    options,
  })

  if (business !== undefined) {
    const { id } = business
    const details = yield call(getBussinessInformation, key, id)
    const listing = { ...business, ...details }
    const { reviews, reviewCount } = yield call(getReviewsOnBusiness, key, id)
    yield put(setDecision({ listing, reviews, reviewCount }))
  } else {
    yield put(setDecision({ listing: [], reviews: [], reviewCount: 0 }))
  }
}

function* addDecisionToUserProfile(action) {
  const { _id, decisions } = action.payload
  const params = { _id, decisions: decisions }
  try {
    const response = yield axios.put(`${PROD_URL}/users/decisions`, {
      data: params,
    })
  } catch (e) {
    yield put(setServerError())
    console.error(`${e} There was an error updating user profile decisions`)
  }
}

function* addImpressionToUserProfile(action) {
  const { _id, impressions } = action.payload
  const params = { _id, impressions }
  try {
    const response = yield axios.put(`${PROD_URL}/users/impressions/`, {
      data: params,
    })
    console.log(response, 'i saved')
  } catch (e) {
    yield put(setServerError())
    console.error(`${e} There was an error updating user profile impressions`)
  }
}

function* rootSaga() {
  yield takeLatest(GET_INITIAL_CONFIG, getInitialConfig)
  yield takeLatest(GET_USER_PROFILE, getUserProfile)
  yield takeLatest(UPDATE_SETTINGS, updateSettings)
  yield takeLatest(GET_DECISION, getDecison)
  yield takeLatest(HANDLE_DECISION, addDecisionToUserProfile)
  yield takeLatest(ADD_IMPRESSION, addImpressionToUserProfile)
}
export default rootSaga
