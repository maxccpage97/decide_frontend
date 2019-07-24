import React, { Component } from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { color } from '../utils/styles'

const styles = ScaledSheet.create({
  container: {
    shadowOffset: { width: 1, height: -1 },
    shadowColor: color.secondary,
    shadowOpacity: 0.5,
    borderRadius: 10,
  },
})

class AdjustableView extends Component {
  render() {
    return (
      <TouchableOpacity
        style={{ ...styles.container, ...this.props.styles.container }}
      />
    )
  }
}

export default AdjustableView
