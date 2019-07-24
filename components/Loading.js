import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import { color } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'
import { BarIndicator } from 'react-native-indicators'

const style = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Loading extends Component {
  render() {
    return (
      <SafeAreaView style={style.container}>
        <BarIndicator count={4} color="white" />
      </SafeAreaView>
    )
  }
}

export default Loading
