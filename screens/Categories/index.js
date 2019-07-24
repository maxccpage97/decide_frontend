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
import { categories } from '../../utils/settings'
import { setSelectedCategories } from './actions'

class Categories extends Component {
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
    const num = 3 - this.props.selectedCategories.length
    return `Select (${num}) Categories`
  }

  handleCategorySelection = category => {
    const { selectedCategories } = this.props
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

  render() {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header title={this.getHeaderTitle()} canGoBack hasSettings />
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
            {categories.map((category, i) => (
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
                          ? // ? '#eceefd'
                            'rgb(241,120,135)'
                          : '#796A6A',
                      },
                    }}
                  />
                </View>
                <Text style={this.styles.groupText}>{category.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {this.props.selectedCategories.length === 3 && (
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
    options: state.Pick.options,
    isLoading: state.Pick.isLoading,
    yelp_token: state.UserConfig.yelp_token,
    location: state.Settings.location,
    userProfile: state.UserConfig.userProfile,
    radius: state.Settings.radius,
    selectedCategories: state.Categories.selectedCategories,
  }
}

export default connect(
  mapStateToProps,
  { setSelectedCategories }
)(Categories)
