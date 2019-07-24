import React, { Component } from 'react'
import { View } from 'react-native'
import MapboxGL from '@mapbox/react-native-mapbox-gl'
import Loading from './Loading'
import { deviceHeight, deviceWidth, color } from '../utils/styles'

MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF4Y2NwYWdlIiwiYSI6ImNqdnd2b3J4aTRiOGQ0OHBiOGFwcGw5eXAifQ.nxG06PwBi7kfAdlUuO780g'
)

export default class MapBackground extends Component {
  style = {
    container: { flex: 1 },
    mapContainer: {
      flex: 1,
    },
  }

  render() {
    const { latitude, longitude } = this.props.userCurrentLocation
    const { radius, location } = this.props

    if (latitude && longitude) {
      return (
        <View style={this.style.container}>
          <MapboxGL.MapView
            showUserLocation={true}
            animated
            zoomLevel={13}
            styleURL={MapboxGL.StyleURL.Light}
            zoomEnabled={true}
            centerCoordinate={[
              !location ? longitude : location.coords.longitude,
              !location ? latitude : location.coords.latitude,
            ]}
            ref={api => (this.Map = api)}
            style={this.style.mapContainer}
          />
        </View>
      )
    } else {
      return <Loading />
    }
  }
}
