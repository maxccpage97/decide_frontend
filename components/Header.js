import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native'
import lightbulb from '../assets/lightbulb.png'
import { color, deviceHeight, deviceWidth, getIcon } from '../utils/styles'
import DeviceInfo from 'react-native-device-info'
import { ScaledSheet } from 'react-native-size-matters'
import { withNavigation } from 'react-navigation'

const deviceId = DeviceInfo.getDeviceId()

class Header extends Component {
  styles = ScaledSheet.create({
    container: {
      backgroundColor: color.primary,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      height: '65@vs',
    },
    containerLogo: {
      backgroundColor: color.primary,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80@vs',
    },
    lightbulbIcon: {
      height: '110@vs',
      width: '200@s',
    },
    titleText: {
      fontSize: '22@ms',
      color: '#fff',
      fontWeight: '500',
    },
    doneText: {
      fontSize: '18@ms',
      color: '#fff',
      fontWeight: '500',
    },
  })

  render() {
    return (
      <View
        style={
          this.props.logo ? this.styles.containerLogo : this.styles.container
        }
      >
        {this.props.logo && (
          <View style={this.styles.lightbulbIcon}>
            <Image
              source={lightbulb}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              resizeMode="contain"
            />
          </View>
        )}
        {this.props.title && (
          <Text style={this.styles.titleText}> {this.props.title} </Text>
        )}
        {this.props.title === 'Settings' && (
          <TouchableOpacity
            onPress={this.props.onUpdate}
            style={{
              position: 'absolute',
              right: 18,
              height: deviceHeight / 25,
              width: deviceWidth / 18,
            }}
          >
            <Image
              source={getIcon('close-white')}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {this.props.hasSettings && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Settings')}
            style={{
              position: 'absolute',
              right: 15,
              height: deviceHeight / 25,
              width: deviceWidth / 13,
            }}
          >
            <Image
              source={getIcon('settings')}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}

        {this.props.accepted && (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Group')}
            style={{
              position: 'absolute',
              right: 15,
              height: deviceHeight / 22,
              width: deviceWidth / 11,
            }}
          >
            <Image
              source={getIcon('group')}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
        {this.props.canGoBack && (
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              position: 'absolute',
              left: 15,
              height: deviceHeight / 30,
              width: deviceWidth / 15,
            }}
          >
            <Image
              source={getIcon('back')}
              style={{
                flex: 1,
                width: undefined,
                height: undefined,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    )
  }
}

export default withNavigation(Header)
