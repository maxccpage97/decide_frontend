import React, { Component } from 'react'
import {
  SafeAreaView,
  Image,
  View,
  Text,
  Animated,
  ImageBackground,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { BarIndicator } from 'react-native-indicators'
import { connect } from 'react-redux'
import _ from 'lodash'
import { formatCustomTimeString } from '../utils/styles'
import { deviceHeight, deviceWidth, getIcon, color } from '../utils/styles'
import DotSpacers from '../components/DotSpacers'

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
    width: deviceWidth / 1.2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '10@ms',
    marginTop: '10@ms',
    paddingRight: '10@ms',
  },
  text: {
    fontSize: '17@ms',
    lineHeight: '28@ms',
    color: color.white,
    textAlign: 'left',
    marginLeft: '10@ms',
    marginRight: '10@ms',
  },
  radius: {
    marginLeft: '2.5@ms',
  },
  address: {
    marginTop: '2.5@ms',
    marginRight: '1.5@ms',
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
            return `${display[0]}, ${display[1]}, ${display[2]}`
          }
        }
      }
    }

    if (userConfig) {
      const { userProfile } = userConfig
      if (userProfile.settings && Array.isArray(userProfile.settings)) {
        if (userProfile.settings[0].location.address) {
          const display = userProfile.settings[0].location.address.split(',')
          return `${display[0]}, ${display[1]}, ${display[2]}, ${display[3]}`
        }
      }
    }

    return ' - '
  }

  getDisplayRadius = () => {
    const { settings } = this.props
    if (settings) {
      if (settings.radius) {
        return `Within ${settings.radius / 1000}km`
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
              <ImageBackground
                source={getIcon('oval')}
                style={{
                  width: deviceWidth / 6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="contain"
              >
                <View style={{ ...style.icon, ...style.address }}>
                  <Image
                    source={getIcon('address-circle')}
                    style={{
                      flex: 1,
                      width: undefined,
                      height: undefined,
                    }}
                    resizeMode="contain"
                  />
                </View>
              </ImageBackground>
              <Text numberOfLines={2} style={style.text}>
                {this.getDisplayAddress()}
              </Text>
            </Animated.View>
            <Animated.View
              style={{
                ...{ opacity: this.state.radius },
                ...style.itemContainer,
              }}
            >
              <ImageBackground
                source={getIcon('oval')}
                style={{
                  width: deviceWidth / 6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="contain"
              >
                <View style={{ ...style.icon, ...style.radius }}>
                  <Image
                    source={getIcon('range-white')}
                    style={{ flex: 1, width: undefined, height: undefined }}
                    resizeMode="contain"
                  />
                </View>
              </ImageBackground>
              <Text style={style.text}> {this.getDisplayRadius()} </Text>
            </Animated.View>
            <Animated.View
              style={{
                ...{ opacity: this.state.time },
                ...style.itemContainer,
              }}
            >
              <ImageBackground
                source={getIcon('oval')}
                style={{
                  width: deviceWidth / 6,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                resizeMode="contain"
              >
                <View style={style.icon}>
                  <Image
                    source={getIcon('clock')}
                    style={{ flex: 1, width: undefined, height: undefined }}
                    resizeMode="contain"
                  />
                </View>
              </ImageBackground>
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
