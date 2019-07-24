import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { connect } from 'react-redux'
import { setPermissionsDenied } from './actions'
import { getInitialConfig } from '../../wrappers/UserConfig/actions'
import Permissions from 'react-native-permissions'
import DeviceInfo from 'react-native-device-info'
import ErrorScreen from '../../components/ErrorScreen'
import Loading from '../../components/Loading'
import { color } from '../../utils/styles'
import { ERROR } from '../../appConstants'

const deviceId = DeviceInfo.getUniqueID()
const deviceType = DeviceInfo.getManufacturer()

class Home extends Component {
  constructor(props) {
    super(props)

    this.checkUserPermissions()
  }
  static navigationOptions = {
    title: 'Home',
    header: null,
  }

  componentDidUpdate(oldProps, oldState) {
    const {
      permissionsDenied,
      serverError,
      isLoading,
      setUserLocation,
      config,
    } = this.props
    const isError = !!permissionsDenied || !!serverError

    if (oldProps.config.currentLocation === null) {
      if (!isError && config) {
        this.props.navigation.navigate('Group')
      }
    }
  }

  checkUserPermissions = () => {
    Permissions.check('location')
      .then(response => {
        if (response === 'denied' || response === 'restricted') {
          this.props.setPermissionsDenied()
        } else {
          this.requestUserPermission()
        }
      })
      .catch(err => {
        console.error(`Something went wrong checking for permission`)
      })
  }

  requestUserPermission = () => {
    Permissions.request('location')
      .then(response => {
        if (response === 'denied') {
          this.props.setPermissionsDenied()
        } else {
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) =>
              this.props.getInitialConfig({
                latitude,
                longitude,
                deviceId,
                deviceType,
              }),
            error => error,
            {}
          )
        }
      })
      .catch(err => {
        console.error(`Something went wrong setting the permission`)
      })
  }

  render() {
    const { permissionsDenied, serverError } = this.props
    const isError = !!permissionsDenied || !!serverError

    if (isError) {
      return (
        <ErrorScreen
          type={permissionsDenied ? ERROR.PERMISSIONS : ERROR.SERVER}
        />
      )
    }

    return <Loading />
  }
}

const mapStateToProps = state => {
  return {
    permissionsDenied: state.Home.permissionsDenied,
    serverError: state.Home.serverError,
    config: state.UserConfig,
    isLoading: state.Home.isLoading,
  }
}

export default connect(
  mapStateToProps,
  { getInitialConfig, setPermissionsDenied }
)(Home)
