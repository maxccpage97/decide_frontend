import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { deviceHeight, deviceWidth, color, getIcon } from '../../utils/styles'
import Loading from '../../components/Loading'
import MapBackground from '../../components/MapBackground'
import { connect } from 'react-redux'
import {
  setLocation,
  updateSettings,
  setTimeOption,
  setTimeValue,
} from './actions'
import { getUserProfile } from '../../wrappers/UserConfig/actions'
import AutoComplete from '../../components/AutoComplete'
import DotSpacers from '../../components/DotSpacers'
import RadiusPicker from '../../components/RadiusPicker'
import Header from '../../components/Header'
import { ScaledSheet } from 'react-native-size-matters'
import { setRadius } from './actions'
import _ from 'lodash'
import moment from 'moment'
import TimePicker from '../../components/TimePicker'

class Settings extends Component {
  constructor(props) {
    super(props)

    if (props.user.deviceId) {
      props.getUserProfile(props.user.deviceId)
    }
  }

  state = {
    isDateTimePickerVisible: true,
  }
  styles = ScaledSheet.create({
    mapContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    keyboard: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      bottom: deviceHeight / 8,
    },
    topSafeView: {
      flex: 0,
      backgroundColor: color.primary,
    },
    secondSafeView: {
      flex: 1,
      backgroundColor: color.white,
    },
    openSettingsText: {
      textAlign: 'center',
      margin: '10@ms',
      paddingRight: '10@ms',
      paddingLeft: '10@ms',
      fontSize: '18@ms',
      fontWeight: '500',
      color: color.dark,
    },
    openSettingsButton: {
      backgroundColor: color.primary,
      borderRadius: '10@ms',
    },
    openSettingsButtonText: {
      padding: '20@ms',
      fontSize: '20@ms',
      fontWeight: '600',
      color: '#fff',
    },
    settingsIcon: {
      position: 'absolute',
      width: deviceWidth / 1.25,
      opacity: 0.2,
      height: deviceHeight / 1.75,
    },
    title: {
      textAlign: 'left',
      margin: '20@ms',
      fontSize: '17@ms',
      fontWeight: '500',
      color: color.dark,
    },
  })

  static navigationOptions = {
    title: 'Settings',
    header: null,
  }

  handleUpdate = (user, location) => {
    if (location === undefined || location === null) {
      this.props.updateSettings({
        location: this.props.location,
        radius: this.state.radius || this.props.radius,
        timeValue: this.state.timeValue || this.props.timeValue,
        timeOption: this.state.timeOption || this.props.timeOption,
      })
    } else {
      this.props.updateSettings({
        _id: user._id,
        settings: { location },
        location,
        radius: this.state.radius || this.props.radius,
        timeValue: this.state.timeValue || this.props.timeValue,
        timeOption: this.state.timeOption || this.props.timeOption,
      })
    }

    this.props.navigation.goBack()
  }

  getLocationValue = () => {
    const {
      user: { settings },
      location,
    } = this.props

    if (location !== undefined) {
      return location
    }

    if (!_.isEmpty(settings)) {
      if (_.first(settings).location !== undefined) {
        return _.first(settings).location
      }
    }

    return null
  }

  render() {
    const {
      currentLocation,
      google_token,
      user,
      location,
      radius,
      setRadius,
      timeOption,
      setTimeOption,
      timeValue,
      setTimeValue,
    } = this.props
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header
            title="Settings"
            onUpdate={() => this.handleUpdate(user, this.state.location)}
          />
          <Text style={this.styles.title}> Where? </Text>
          <AutoComplete
            API={google_token}
            userCurrentLocation={currentLocation}
            setLocation={value => this.setState({ location: value })}
            location={
              this.state.location === undefined
                ? this.getLocationValue()
                : this.state.location
            }
          />
          <Text style={this.styles.title}> How Far? </Text>
          <RadiusPicker
            radius={this.state.radius || radius}
            setRadius={value => this.setState({ radius: value })}
          />

          <Text style={this.styles.title}> When? </Text>
          <TimePicker
            timeOption={this.state.timeOption || timeOption}
            setTimeOption={value =>
              this.setState({
                timeOption: value,
              })
            }
            timeValue={this.state.timeValue || timeValue}
            setTimeValue={value => this.setState({ timeValue: value })}
          />
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentLocation: state.UserConfig.currentLocation,
    user: state.UserConfig.userProfile,
    google_token: state.UserConfig.google_token,
    location: state.Settings.location,
    radius: state.Settings.radius,
    timeOption: state.Settings.timeOption,
    timeValue: state.Settings.timeValue,
  }
}

export default connect(
  mapStateToProps,
  {
    setLocation,
    updateSettings,
    getUserProfile,
    setRadius,
    setTimeOption,
    setTimeValue,
  }
)(Settings)
