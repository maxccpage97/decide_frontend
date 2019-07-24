import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import _ from 'lodash'
import {
  deviceHeight,
  deviceWidth,
  getIcon,
  color,
  formatCustomTimeString,
} from '../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'
import DateTimePicker from 'react-native-modal-datetime-picker'
import moment from 'moment'

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
  locationIcon: {
    height: deviceHeight / 12,
    width: deviceWidth / 12,
  },
  label: {
    textAlign: 'center',
    fontSize: '16@ms',
  },
})

export default class TimePicker extends Component {
  state = {
    isDateTimePickerVisible: false,
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true })
  }

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false })
    this.props.setTimeOption(0)
  }

  handleDatePicked = date => {
    this.setState({ isDateTimePickerVisible: false })
    this.props.setTimeValue(date)
  }

  isSelected = val => {
    if (this.props.timeOption === val) {
      return true
    }
    return false
  }

  handleSelection = val => {
    if (val === 1) {
      this.setState({
        isDateTimePickerVisible: true,
      })
    }
    this.props.setTimeOption(val)
  }

  getCustomLabel = () => {
    const { timeValue } = this.props
    if (timeValue !== null) {
      return formatCustomTimeString(timeValue)
    }
    return 'Set Specific Time'
  }

  render() {
    const options = [
      { value: 0, label: 'Now' },
      { value: 1, label: this.getCustomLabel() },
    ]
    return (
      <View style={styles.container}>
        <View style={styles.staticContainer}>
          <View style={styles.locationIcon}>
            <Image
              source={getIcon('time')}
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
                flex: option.value === 0 ? 0.5 : 1,
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
                onPress={() => this.handleSelection(option.value)}
              >
                <Text
                  style={{
                    ...styles.label,
                    ...{
                      color: this.isSelected(option.value) ? '#FFF' : '#c8c8c8',
                    },
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            </View>
          )
        })}
        <DateTimePicker
          mode="datetime"
          minimumDate={
            this.props.timeValue ? new Date(this.props.timeValue) : new Date()
          }
          titleIOS={'Pick Date & Time'}
          minuteInterval={30}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
    )
  }
}
