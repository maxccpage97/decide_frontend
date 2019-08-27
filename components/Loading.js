import React, { Component } from 'react'
import { SafeAreaView, Image, View, Text, Animated } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { BarIndicator } from 'react-native-indicators'
import { connect } from 'react-redux'
import _ from 'lodash'
import { formatCustomTimeString } from '../utils/styles'
import { deviceHeight, deviceWidth, getIcon, color } from '../utils/styles'
const style = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
  },
  itemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    height: deviceHeight / 12,
    width: deviceWidth / 12,
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2.5@ms',
  },
  text: {
    fontSize: '18@ms',
    lineHeight: '28@ms',
    color: color.white,
    textAlign: 'center',
    marginLeft: '10@ms',
  },
})

class Loading extends Component {
  state = {
    location: new Animated.Value(0),
    radius: new Animated.Value(0),
    time: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.location, {
      toValue: 1,
      duration: 1000,
    }).start(() =>
      Animated.timing(this.state.radius, {
        toValue: 1,
        duration: 1000,
      }).start(() =>
        Animated.timing(this.state.time, {
          toValue: 1,
          duration: 1000,
        }).start()
      )
    )
  }

  getDisplayAddress = () => {
    const { settings, userConfig } = this.props
    if (settings) {
      const { location } = settings
      if (location) {
        const { address } = location
        if (address) {
          const display = address.split(',')
          if (!_.isEmpty(display) && display.length >= 3) {
            return `${display[0]}`
          }
        }
      }
    }

    if (userConfig) {
      const { userProfile } = userConfig
      if (userProfile.settings && Array.isArray(userProfile.settings)) {
        if (userProfile.settings[0].location.address) {
          const display = userProfile.settings[0].location.address.split(',')
          return `${display[0]}`
        }
      }
    }

    return ' - '
  }

  getDisplayRadius = () => {
    const { settings } = this.props
    if (settings) {
      if (settings.radius) {
        return `${settings.radius / 1000}km`
      }
    }

    return ' - '
  }

  getDisplayTime = () => {
    const { settings } = this.props
    if (settings) {
      const { timeOption } = settings
      if (timeOption === 0) {
        return 'Open Now'
      }
      if (timeOption === 1) {
        const { timeValue } = settings
        if (timeValue !== null) {
          return `Open ${formatCustomTimeString(timeValue)}`
        }
      }
    }
    return ' - '
  }

  render() {
    if (this.props.isLoadingDecision) {
      return (
        <SafeAreaView style={style.container}>
          <View style={style.itemsContainer}>
            <Animated.View
              style={{
                ...{ opacity: this.state.location },
                ...style.itemContainer,
              }}
            >
              <View style={style.icon}>
                <Image
                  source={getIcon('location-fill-white')}
                  style={{ flex: 1, width: undefined, height: undefined }}
                  resizeMode="contain"
                />
              </View>
              <Text style={style.text}> {this.getDisplayAddress()} </Text>
            </Animated.View>
            <Animated.View
              style={{
                ...{ opacity: this.state.radius },
                ...style.itemContainer,
              }}
            >
              <View style={style.icon}>
                <Image
                  source={getIcon('range-white')}
                  style={{ flex: 1, width: undefined, height: undefined }}
                  resizeMode="contain"
                />
              </View>
              <Text style={style.text}> {this.getDisplayRadius()} </Text>
            </Animated.View>
            <Animated.View
              style={{
                ...{ opacity: this.state.time },
                ...style.itemContainer,
              }}
            >
              <View style={style.icon}>
                <Image
                  source={getIcon('clock')}
                  style={{ flex: 1, width: undefined, height: undefined }}
                  resizeMode="contain"
                />
              </View>
              <Text style={style.text}> {this.getDisplayTime()} </Text>
            </Animated.View>
          </View>
        </SafeAreaView>
      )
    }
    return (
      <SafeAreaView style={style.container}>
        <BarIndicator count={4} color="white" />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    userConfig: state.UserConfig,
    settings: state.Settings,
    group: state.Group,
    categories: state.Categories,
  }
}

export default connect(
  mapStateToProps,
  null
)(Loading)
