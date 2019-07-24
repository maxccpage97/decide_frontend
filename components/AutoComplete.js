import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
} from 'react-native'
import _ from 'lodash'
import { deviceHeight, deviceWidth, getIcon, color } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'
import axios from 'axios'
import Geocoder from 'react-native-geocoding'

const styles = ScaledSheet.create({
  container: {
    width: deviceWidth,
    borderRadius: '2.5@ms',
    marginBottom: '5@ms',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#796A6A',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  searchContainer: {
    width: deviceWidth,
    paddingTop: '10@ms',
    paddingBottom: '10@ms',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  optionContainer: {
    width: deviceWidth,
    alignItems: 'center',
    marginBottom: '5@ms',
    marginTop: '-1@ms',
  },
  scrollViewContainer: {
    width: deviceWidth,
    maxHeight: '150@vs',
    borderRadius: '2.5@ms',
    backgroundColor: '#FFFFFF',
  },
  touchableOption: {
    display: 'flex',
    padding: '10@ms',
    borderWidth: '1@ms',
    borderStyle: 'solid',
    borderColor: `rgb(242, 242, 242)`,
  },
  touchableOptionText: {
    fontSize: '14@ms',
  },
  touchableOptionSmallText: {
    marginTop: '10@ms',
    color: '#c8c8c8',
    fontSize: '12@ms',
  },
  searchIcon: {
    width: '25@s',
    height: '25@vs',
    margin: '10@ms',
  },
  clearIcon: {
    marginLeft: '10@ms',
    width: '20@s',
    height: '20@vs',
  },
  currentLocationIcon: {
    margin: '10@ms',
    width: '25@s',
    height: '25@vs',
  },
  textInput: {
    padding: '2.5@ms',
    flex: 1,
    fontSize: '16@ms',
    color: color.dark,
  },
})

export default class AutoComplete extends Component {
  constructor(props) {
    super(props)

    if (this.props.API) {
      Geocoder.init(this.props.API)
    }
  }

  state = {
    options: null,
    input: '',
  }

  handleAutoComplete = text => {
    const { API, userCurrentLocation } = this.props
    if (API) {
      if (text == '') {
        this.setState({
          options: null,
        })
      }
      this.setState({
        input: text,
      })
      if (text !== '' && text.length >= 4) {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&key=${
              this.props.API
            }&location=${userCurrentLocation.latitude},${
              userCurrentLocation.longitude
            }&radius=200000&strictbounds`
          )
          .then(response => {
            let options = response.data.predictions
            this.setState({ options })
          })
          .catch(err => {
            console.error(
              `There was an error fetching places w/ google maps${err}`
            )
          })
      }
    }
  }

  getOptions = () => {
    return (
      <View style={styles.optionContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          {this.state.options.map((option, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.touchableOption}
                key={option.id}
                onPress={() => this.handleOptionSelection(option)}
              >
                <Text style={styles.touchableOptionText}>
                  {option.structured_formatting.main_text}
                </Text>
                <Text style={styles.touchableOptionSmallText}>
                  {option.structured_formatting.secondary_text}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>
      </View>
    )
  }

  handleOptionSelection = option => {
    Geocoder.from(option.description)
      .then(response => {
        const coordinates = response.results[0].geometry.location
        const coords = {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        }
        this.setState({
          options: null,
        })
        this.props.setLocation({ coords, address: option.description })
      })
      .catch(error => console.warn(error))
  }

  handleClearText = () => {
    this.setState({
      options: null,
      input: '',
    })
    this.props.setLocation(null)
  }

  getLocationIcon = () => {
    if (this.props.location) {
      if (
        _.isEqual(this.props.userCurrentLocation, this.props.location.coords)
      ) {
        return getIcon('location-fill')
      }
    }
    return getIcon('location')
  }

  getAutoCompleteValue = () => {
    if (this.props.location) {
      return this.props.location.address
    }
    return this.state.input
  }

  handleUseOfCurrentLocation = () => {
    const { latitude, longitude } = this.props.userCurrentLocation
    Geocoder.from({
      latitude,
      longitude,
    })
      .then(response => {
        const address = response.results[0].formatted_address
        this.setState({
          options: null,
        })
        this.props.setLocation({
          coords: { latitude, longitude },
          address,
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          {/* Search Icon */}
          <View style={styles.searchIcon}>
            <Image
              source={getIcon('search')}
              style={{ flex: 1, width: undefined, height: undefined }}
              resizeMode="contain"
            />
          </View>
          {/* Text Input */}
          <TextInput
            style={styles.textInput}
            placeholder="Enter your starting address"
            onChangeText={this.handleAutoComplete}
            value={this.getAutoCompleteValue()}
          />
          {/* Clear Icon */}
          <TouchableOpacity
            onPress={this.handleClearText}
            style={styles.clearIcon}
          >
            <Image
              source={getIcon('close')}
              style={{ flex: 1, width: undefined, height: undefined }}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {/* Current Location Icon */}
          <TouchableOpacity
            onPress={this.handleUseOfCurrentLocation}
            style={styles.currentLocationIcon}
          >
            <Image
              source={this.getLocationIcon()}
              style={{ flex: 1, width: undefined, height: undefined }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* Options */}
        {this.state.options &&
          this.state.input.length >= 4 &&
          !this.props.location &&
          this.getOptions()}
      </View>
    )
  }
}
