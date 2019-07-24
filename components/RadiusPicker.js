import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import _ from 'lodash'
import { deviceHeight, deviceWidth, getIcon, color } from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    borderRadius: '2.5@ms',
    marginBottom: '5@ms',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#796A6A',
    shadowOpacity: 0.2,
    elevation: 5,
  },
  staticContainer: {
    padding: '2.5@ms',
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radiusIcon: {
    height: deviceHeight / 12,
    width: deviceWidth / 12,
  },
  label: {
    textAlign: 'center',
    fontSize: '16@ms',
  },
})

const options = [
  { value: 2000, label: '2km' },
  { value: 10000, label: '10km' },
  { value: 25000, label: '25km' },
  { value: 40000, label: '40km+' },
]

export default class RadiusPicker extends Component {
  isSelected = val => {
    if (this.props.radius === val) {
      return true
    }
    return false
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.staticContainer}>
          <View style={styles.radiusIcon}>
            <Image
              source={getIcon('range')}
              style={{ flex: 1, width: undefined, height: undefined }}
              resizeMode="contain"
            />
          </View>
        </View>
        {options.map((option, i) => {
          return (
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: '#FFF',
              }}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  borderWidth: this.isSelected(option.value) ? 0 : 1,
                  borderStyle: 'solid',
                  borderColor: `rgb(242, 242, 242)`,
                  borderTopWidth: 0,
                  borderBottomWidth: 0,
                  backgroundColor: this.isSelected(option.value)
                    ? `#ef6879`
                    : '#FFF',
                  justifyContent: 'center',
                }}
                key={i}
                onPress={() => this.props.setRadius(option.value)}
              >
                <Text
                  style={{
                    ...styles.label,
                    ...{
                      color: this.isSelected(option.value) ? '#FFF' : '#c8c8c8',
                    },
                  }}
                >
                  {' '}
                  {option.label}{' '}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
    )
  }
}
