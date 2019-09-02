import { Dimensions } from 'react-native'
import _ from 'lodash'
//Icon Imports
import serverError from '../assets/server-error-icon.png'
import serverErrorGrey from '../assets/server-error-icon-grey.png'
import error from '../assets/error-icon.png'
import reset from '../assets/reset-icon.png'
import search from '../assets/search.png'
import locationFill from '../assets/location-fill.png'
import locationLine from '../assets/location-line.png'
import close from '../assets/close.png'
import closeWhite from '../assets/close-white.png'
import range from '../assets/range.png'
import rangeWhite from '../assets/range-white.png'
import settings from '../assets/settings.png'
import accept from '../assets/accept.png'
import decline from '../assets/decline.png'
import settingsMulti from '../assets/settings-multi.png'
import time from '../assets/time.png'
import clock from '../assets/clock.png'
import price from '../assets/price.png'
import address from '../assets/address.png'
import locationFillWhite from '../assets/location-fill-white.png'
import phone from '../assets/phone.png'
import back from '../assets/back.png'
import threeStar from '../assets/stars/3_stars.png'
import threeHalfStar from '../assets/stars/3.5_stars.png'
import fourStar from '../assets/stars/4_stars.png'
import fourHalfStar from '../assets/stars/4.5_stars.png'
import fiveStar from '../assets/stars/5_stars.png'
import addressCirlce from '../assets/address-circle.png'
import oval from '../assets/Oval.png'
import group from '../assets/group.png'

//Colors
export const color = {
  primary: '#EC4358',
  highlight: 'rgba(67,88,236, 0.4)',
  white: '#FFFAFA',
  dark: '#3F3F3F',
}

//Icon Exports
export const getIcon = type => {
  switch (type) {
    case 'server-error':
      return serverError
    case 'error':
      return error
    case 'reset':
      return group
    case 'search':
      return search
    case 'location-fill-white':
      return locationFillWhite
    case 'location-fill':
      return locationFill
    case 'location':
      return locationLine
    case 'close':
      return close
    case 'range':
      return range
    case 'range-white':
      return rangeWhite
    case 'settings':
      return settings
    case 'time':
      return time
    case 'clock':
      return clock
    case 'settings-multi':
      return settingsMulti
    case 'close-white':
      return closeWhite
    case 'back':
      return back
    case 'empty':
      return serverErrorGrey
    case 'price':
      return price
    case 'accept':
      return accept
    case 'decline':
      return decline
    case 'phone':
      return phone
    case 'address':
      return address
    case 'address-circle':
      return addressCirlce
    case 'oval':
      return oval
  }
}

export const getStarIcon = rating => {
  switch (rating) {
    case 3:
      return threeStar
    case 3.5:
      return threeHalfStar
    case 4:
      return fourStar
    case 4.5:
      return fourHalfStar
    case 5:
      return fiveStar
  }
}

//Device Dimensions
export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height

export const parseDayOfWeek = int => {
  switch (int) {
    case 0:
      return 'Sun'
    case 1:
      return 'Mon'
    case 2:
      return 'Tues'
    case 3:
      return 'Wed'
    case 4:
      return 'Thurs'
    case 5:
      return 'Fri'
    case 6:
      return 'Sat'
  }
}

export const formatCustomTimeString = val => {
  const currentDay = {
    month: new Date().getMonth(),
    day: new Date().getDate(),
  }
  const selectedDay = {
    month: new Date(val).getMonth(),
    day: new Date(val).getDate(),
  }
  const isToday = _.isEqual(currentDay, selectedDay)
  const dayOfWeek = parseDayOfWeek(new Date(val).getDay())
  const hour = new Date(val).getHours()
  const minute = new Date(val).getMinutes()
  const amp = hour <= 12 ? 'AM' : 'PM'
  let day = isToday ? 'Today' : dayOfWeek
  let time = `${hour === 0 ? '12' : hour > 12 ? hour - 12 : hour}:${
    minute === 0 ? '00' : minute
  }${amp}`

  return `${day} @ ${time}`
}
