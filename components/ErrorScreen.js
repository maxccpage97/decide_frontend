import React, { Component } from 'react'
import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import { getIcon, color, deviceHeight, deviceWidth } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'
import { ERROR } from '../appConstants'

const styles = ScaledSheet.create({
  safeView: {
    flex: 1,
    paddingLeft: '15@ms',
    paddingRight: '15@ms',
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: '155@vs',
    width: '155@s',
    marginBottom: '20@ms',
  },
  resetImageContainer: {
    height: '25@vs',
    width: '25@s',
    marginRight: '5@ms',
  },
  text: {
    fontSize: '20@ms',
    lineHeight: '28@ms',
    color: color.white,
    textAlign: 'center',
  },
  button: {
    marginTop: '30@ms',
    backgroundColor: 'transparent',
    padding: '15@ms',
    borderRadius: '10@ms',
    borderWidth: '4@ms',
    borderStyle: 'solid',
    borderColor: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: '18@ms',
    color: '#fff',
  },
})

class ErrorScreen extends Component {
  getText = type => {
    switch (type) {
      case ERROR.UNKNOWN:
        return `Oops! This is awkward. Not sure what happened there...`
        break
      case ERROR.PERMISSIONS:
        return `Ouf! You must enable your location permissions to continue.`
        break
      case ERROR.SERVER:
        return `Ouf! Much like our founder, sometimes our server just randomly falls asleep.`
        break
      default:
        return `Uhmm...We're sorry?`
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        <View style={styles.imageContainer}>
          <Image
            style={{ flex: 1, width: undefined, height: undefined }}
            source={getIcon('error')}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.text}>{this.getText(this.props.type)}</Text>
        {this.props.reset && (
          <TouchableOpacity onPress={this.props.reset} style={styles.button}>
            <View style={styles.resetImageContainer}>
              <Image
                style={{ flex: 1, width: undefined, height: undefined }}
                source={getIcon('reset')}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.buttonText}> Refresh </Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    )
  }
}

export default ErrorScreen
