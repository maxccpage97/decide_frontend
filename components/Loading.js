import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { color } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'
import { BarIndicator } from 'react-native-indicators'
import { connect } from 'react-redux'
import _ from 'lodash'
import { formatCustomTimeString } from '../utils/styles'
import moment from 'moment'

const style = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Loading extends Component {
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
      const { settings } = userConfig
      if (settings && Array.isArray(settings)) {
        if (settings[0].address) {
          const display = settings[0].address.split(',')
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
        return `within ${settings.radius / 1000}km`
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
