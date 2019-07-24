import getDistance from 'geolib/es/getDistance'
import _ from 'lodash'

export const getNumberOfDots = num => {
  let arr = []
  for (let i = 0; i < num; i++) {
    arr.push(i)
  }
  return arr
}

export const getDistanceBetweenTwoCoords = (startingPoint, business) => {
  const distance = _.round(
    getDistance(startingPoint, business, (accuracy = 1)) / 1000,
    1
  )
  return distance < 1 ? 'Less than 1km' : `${distance}km`
}
