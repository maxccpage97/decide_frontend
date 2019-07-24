import React, { Component } from 'react'
import {
  View,
  Text,
  KeyboardAvoidingView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import { deviceHeight, deviceWidth, color, getIcon } from '../../utils/styles'
import Loading from '../../components/Loading'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import { ScaledSheet } from 'react-native-size-matters'
import _ from 'lodash'
import { groups } from '../../utils/settings'
import { BarIndicator } from 'react-native-indicators'
import { setGroup } from './actions'

class Group extends Component {
  constructor(props) {
    super(props)
  }

  styles = ScaledSheet.create({
    mapContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    keyboard: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      bottom: deviceHeight / 8,
    },
    topSafeView: {
      flex: 0,
      backgroundColor: color.primary,
    },
    secondSafeView: {
      flex: 1,
      backgroundColor: color.white,
    },
    openSettingsText: {
      textAlign: 'center',
      margin: '10@ms',
      paddingRight: '10@ms',
      paddingLeft: '10@ms',
      fontSize: '18@ms',
      marginBottom: '20@ms',
      letterSpacing: 0.5,
      color: color.dark,
    },
    openSettingsButton: {
      backgroundColor: color.primary,
      borderRadius: '10@ms',
    },
    openSettingsButtonText: {
      padding: '20@ms',
      fontSize: '20@ms',
      fontWeight: '500',
      color: '#fff',
    },
    settingsIcon: {
      position: 'absolute',
      width: deviceWidth / 1.25,
      opacity: 0.1,
      height: deviceHeight / 1.75,
    },
    scrollContainer: {
      width: '100%',
      paddingLeft: '15@ms',
      paddingRight: '15@ms',
      paddingTop: '5@ms',
      paddingBottom: '10@ms',
    },
    groupText: {
      fontSize: '25@ms',
      fontWeight: '500',
      color: '#FFFFFF',
      position: 'absolute',
    },
    groupContainer: {
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#796A6A',
      shadowOpacity: 0.5,
      borderRadius: '10@ms',
      margin: '5@ms',
      backgroundColor: '#FFF',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    groupImage: {
      height: deviceHeight / 3.25,
      width: deviceWidth / 1.05,
      borderRadius: '10@ms',
      overflow: 'hidden',
    },
    groupOverlay: {
      position: 'absolute',
      height: deviceHeight / 3.25,
      width: deviceWidth / 1.05,
      opacity: 0.7,
      borderTopLeftRadius: '10@ms',
      borderTopRightRadius: '10@ms',
      backgroundColor: '#796A6A',
    },
  })

  static navigationOptions = {
    title: 'Group',
    header: null,
  }

  handleGroupSelection = group => {
    const { alias, label, hasCategories } = group
    this.props.setGroup({
      label,
      alias,
    })
    this.props.navigation.navigate(hasCategories ? 'Categories' : 'Pick')
  }

  getOpenSettings = () => {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header logo hasSettings />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={this.styles.settingsIcon}>
              <Image
                source={getIcon('settings-multi')}
                style={{ flex: 1, width: undefined, height: undefined }}
                resizeMode="contain"
              />
            </View>
            <Text style={this.styles.openSettingsText}>
              Hang On! We need you to set your starting address, that way we
              know where to look! You can change your settings at anytime.
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Settings')}
              style={this.styles.openSettingsButton}
            >
              <Text style={this.styles.openSettingsButtonText}>
                Open Settings
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  render() {
    const { user, location } = this.props

    if (_.isEmpty(user.settings)) {
      if (location === undefined) {
        return this.getOpenSettings()
      }
    }

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header title="Select a group" hasSettings />
          <ScrollView
            style={this.styles.scrollContainer}
            contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
          >
            {groups.map((group, i) => (
              <TouchableOpacity
                key={i}
                style={this.styles.groupContainer}
                onPress={() => this.handleGroupSelection(group)}
              >
                <View style={this.styles.groupImage}>
                  <Image
                    source={{ uri: group.img }}
                    borderTopRightRadius={10}
                    borderTopLeftRadius={10}
                    style={{ flex: 1, width: undefined, height: undefined }}
                    resizeMode="cover"
                  />

                  <View style={this.styles.groupOverlay} />
                </View>
                <Text style={this.styles.groupText}>{group.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserConfig.userProfile,
    location: state.Settings.location,
  }
}

export default connect(
  mapStateToProps,
  { setGroup }
)(Group)
