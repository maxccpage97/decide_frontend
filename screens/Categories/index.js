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
import { connect } from 'react-redux'
import {
  deviceHeight,
  deviceWidth,
  color,
  getIcon,
  getStarIcon,
} from '../../utils/styles'
import Loading from '../../components/Loading'
import Header from '../../components/Header'
import _ from 'lodash'
import { ScaledSheet } from 'react-native-size-matters'
import {
  categories,
  desserts,
  nightlife,
  experiences,
} from '../../utils/settings'
import { setSelectedCategories, clearCategories } from './actions'

class Categories extends Component {
  constructor(props) {
    super(props)

    props.clearCategories()
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
      paddingTop: '5@ms',
      paddingBottom: '10@ms',
    },
    largeScrollContainer: {
      width: '100%',
      paddingLeft: '15@ms',
      paddingRight: '15@ms',
      paddingTop: '5@ms',
      paddingBottom: '10@ms',
    },
    groupText: {
      fontSize: '23@ms',
      fontWeight: '500',
      color: '#FFFFFF',
      position: 'absolute',
      textAlign: 'center',
    },
    largeGroupText: {
      fontSize: '25@ms',
      fontWeight: '500',
      color: '#FFFFFF',
      position: 'absolute',
    },
    categoryContainer: {
      shadowOffset: { width: 1, height: 1 },
      shadowColor: '#796A6A',
      shadowOpacity: 0.5,
      borderRadius: '10@ms',
      justifyContent: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      width: deviceWidth / 2.185,
      height: deviceHeight / 4.75,
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
    largeGroupImage: {
      height: deviceHeight / 3.25,
      width: deviceWidth / 1.05,
      borderRadius: '10@ms',
      overflow: 'hidden',
    },
    largeGroupOverlay: {
      position: 'absolute',
      height: deviceHeight / 3.25,
      width: deviceWidth / 1.05,
      opacity: 0.7,
      borderTopLeftRadius: '10@ms',
      borderTopRightRadius: '10@ms',
      backgroundColor: '#796A6A',
    },
    groupImage: {
      width: deviceWidth / 2.185,
      height: deviceHeight / 4.75,
      borderRadius: '10@ms',
      overflow: 'hidden',
    },
    groupOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.7,
      borderRadius: '10@ms',
    },
    continueButton: {
      width: deviceWidth,
      height: deviceHeight / 8,
      bottom: 0,
      position: 'absolute',
      zIndex: 10,
      display: 'flex',
      backgroundColor: color.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    continueText: { color: '#fff', fontSize: '20@ms', fontWeight: '500' },
  })

  static navigationOptions = {
    title: 'Categories',
    header: null,
  }

  getHeaderTitle = () => {
    const {
      group: { label },
      options,
    } = this.props
    const hasSelection = label === 'Restaurants' || label === 'Experiences'
    if (hasSelection) {
      const num = 3 - this.props.selectedCategories.length
      return `Select (${num}) ${
        label === 'Restaurants' ? 'Categories' : 'Experiences'
      }`
    } else {
      return `Select 1 Category`
    }
  }

  handleCategorySelection = category => {
    const {
      selectedCategories,
      group: { label },
    } = this.props
    const hasSelection = label === 'Restaurants' || label === 'Experiences'
    if (hasSelection) {
      let updatedState = [...selectedCategories]
      if (_.includes(updatedState.map(x => x.label), category.label)) {
        const index = updatedState.findIndex(x => x.label === category.label)
        updatedState.splice(index, 1)
      } else {
        if (updatedState.length <= 2) {
          updatedState.push(category)
        }
      }
      this.props.setSelectedCategories(updatedState)
    } else {
      this.props.setSelectedCategories([category])
      this.props.navigation.navigate('Decision')
    }
  }

  getMargin = index => {
    const margin = '10@ms'
    const Left = ScaledSheet.create({
      marginLeft: margin,
      marginRight: margin,
      marginTop: margin,
    })
    const Right = ScaledSheet.create({
      marginRight: margin,
      marginTop: margin,
    })

    if (index % 2) {
      return Right
    }
    return Left
  }

  getItems = label => {
    switch (label) {
      case 'Restaurants':
        return categories
      case 'Desserts':
        return desserts
      case 'Nightlife':
        return nightlife
      case 'Experiences':
        return experiences
    }
  }

  getCategories = label => {
    const items = this.getItems(label)
    if (items.length > 6) {
      return items.map((category, i) => (
        <TouchableOpacity
          key={i}
          style={{
            ...this.styles.categoryContainer,
            ...this.getMargin(i),
          }}
          onPress={() => this.handleCategorySelection(category)}
        >
          <View style={this.styles.groupImage}>
            <Image
              source={{ uri: category.img }}
              borderRadius={10}
              style={{ flex: 1, width: undefined, height: undefined }}
              resizeMode="cover"
            />

            <View
              style={{
                ...this.styles.groupOverlay,
                ...{
                  backgroundColor: this.props.selectedCategories
                    .map(x => x.label)
                    .includes(category.label)
                    ? 'rgb(241,120,135)'
                    : '#796A6A',
                },
              }}
            />
          </View>
          <Text style={this.styles.groupText}>{category.label}</Text>
        </TouchableOpacity>
      ))
    } else {
      return items.map((category, i) => (
        <TouchableOpacity
          key={i}
          style={this.styles.groupContainer}
          onPress={() => this.handleCategorySelection(category)}
        >
          <View style={this.styles.largeGroupImage}>
            <Image
              source={{ uri: category.img }}
              borderTopRightRadius={10}
              borderTopLeftRadius={10}
              style={{ flex: 1, width: undefined, height: undefined }}
              resizeMode="cover"
            />

            <View style={this.styles.largeGroupOverlay} />
          </View>
          <Text style={this.styles.largeGroupText}>{category.label}</Text>
        </TouchableOpacity>
      ))
    }
  }

  render() {
    const {
      group: { label },
    } = this.props
    const isSmall = label === 'Restaurants' || label === 'Experiences'
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header title={this.getHeaderTitle()} canGoBack hasSettings />
          {isSmall ? (
            <ScrollView
              style={this.styles.scrollContainer}
              contentContainerStyle={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {this.getCategories(label)}
            </ScrollView>
          ) : (
            <ScrollView
              style={this.styles.largeScrollContainer}
              contentContainerStyle={{ display: 'flex', alignItems: 'center' }}
            >
              {this.getCategories(label)}
            </ScrollView>
          )}
          {isSmall && this.props.selectedCategories.length === 3 && (
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Decision')}
              style={this.styles.continueButton}
            >
              <Text style={this.styles.continueText}>Continue</Text>
            </TouchableOpacity>
          )}
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.UserConfig.userProfile,
    group: state.Group.group,
    yelp_token: state.UserConfig.yelp_token,
    location: state.Settings.location,
    userProfile: state.UserConfig.userProfile,
    radius: state.Settings.radius,
    selectedCategories: state.Categories.selectedCategories,
  }
}

export default connect(
  mapStateToProps,
  { setSelectedCategories, clearCategories }
)(Categories)
