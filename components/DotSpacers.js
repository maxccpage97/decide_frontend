import React, { Component } from 'react'
import { View } from 'react-native'
import { getNumberOfDots } from '../utils/misc'
import { color } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'

class DotSpacers extends Component {
  styles = ScaledSheet.create({
    container: {
      height: '40@vs',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    dot: {
      zIndex: 10,
      alignSelf: 'center',
      borderColor: color.white,
      borderStyle: 'solid',
      borderWidth: 1,
      height: '10@vs',
      width: '10@s',
      borderRadius: '4.5@vs',
      opacity: 1,
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
