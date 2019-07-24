import React, { Component } from 'react'
import { View } from 'react-native'
import { getNumberOfDots } from '../utils/misc'
import { color } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'

class DotSpacers extends Component {
  styles = ScaledSheet.create({
    container: {
      height: '45@vs',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dot: {
      zIndex: 10,
      alignSelf: 'center',
      backgroundColor: '#c8c8c8',
      height: '14@vs',
      width: '14@s',
      borderRadius: '10@vs',
      opacity: 0.8,
    },
  })

  render() {
    const dots = getNumberOfDots(3)
    return (
      <View style={this.styles.container}>
        {dots.map((dot, i) => (
          <View style={this.styles.dot} />
        ))}
      </View>
    )
  }
}

export default DotSpacers
