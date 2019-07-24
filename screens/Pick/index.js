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
import { getOptions, setSelectedOptions, clearPickState } from './actions'
import _ from 'lodash'
import { ScaledSheet } from 'react-native-size-matters'
import { getDistanceBetweenTwoCoords } from '../../utils/misc'

class Pick extends Component {
  constructor(props) {
    super(props)

    const coords =
      props.location && props.location.coords
        ? props.location.coords
        : props.userProfile &&
          props.userProfile.settings[0] &&
          props.userProfile.settings[0].location.coords

    props.getOptions({
      group: props.group,
      key: props.yelp_token,
      coords,
      radius: props.radius,
      time: {
        timeOption: props.timeOption,
        timeValue: props.timeValue,
      },
    })
  }

  styles = ScaledSheet.create({
    topSafeView: {
      flex: 0,
      backgroundColor: color.primary,
    },
    secondSafeView: {
      flex: 1,
      backgroundColor: color.white,
    },
    scrollContainer: {
      width: '100%',
      paddingLeft: '15@ms',
      paddingRight: '15@ms',
      paddingTop: '5@ms',
      paddingBottom: '10@ms',
    },
    groupText: {
      fontSize: '17@ms',
      fontWeight: '500',
      color: color.dark,
      overflow: 'hidden',
    },
    locationText: {
      fontSize: '14@ms',
      fontWeight: '400',
      color: color.dark,
      overflow: 'hidden',
      marginTop: '5@ms',
    },
    optionContainer: {
      shadowOffset: { width: 1, height: -1 },
      shadowColor: '#796A6A',
      shadowOpacity: 0.5,
      elevation: 5,
      borderRadius: '10@ms',
      backgroundColor: '#FFF',
      margin: '5@ms',
      display: 'flex',
      flexDirection: 'row',
      height: deviceHeight / 6,
      width: deviceWidth / 1.05,
    },
    optionImage: {
      flex: 0.35,
      height: deviceHeight / 6,
      borderBottomLeftRadius: '10@ms',
      borderTopLeftRadius: '10@ms',
      overflow: 'hidden',
    },
    groupOverlay: {
      position: 'absolute',
      height: deviceHeight / 5.75,
      width: '100%',
      opacity: 0.6,
      borderBottomLeftRadius: '10@ms',
      borderTopLeftRadius: '10@ms',
      backgroundColor: '#796A6A',
    },

    optionInformation: {
      flex: 0.65,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '15@ms',
      borderTopRightRadius: '10@ms',
      borderBottomRightRadius: '10@ms',
    },
    starsImage: {
      height: '30@vs',
      width: '100@s',
      overflow: 'hidden',
    },
    reviewsText: {
      fontSize: '13@ms',
      marginLeft: '5@ms',
      fontStyle: 'italic',
      color: color.dark,
      overflow: 'hidden',
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
    noResultsText: {
      textAlign: 'center',
      margin: '10@ms',
      paddingRight: '10@ms',
      paddingLeft: '10@ms',
      fontSize: '18@ms',
      marginBottom: '20@ms',
      letterSpacing: 0.5,
      color: color.dark,
    },
  })

  componentDidMount() {
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.props.clearPickState()
      }
    )
  }

  componentWillUnmount() {
    this.willBlurListener.remove()
  }

  componentDidUpdate(oldProps) {
    const { location, radius, options, userProfile } = oldProps

    const coords =
      this.props.location && this.props.location.coords
        ? this.props.location.coords
        : this.props.userProfile &&
          this.props.userProfile.settings[0] &&
          this.props.userProfile.settings[0].location.coords

    if (location !== this.props.location || radius !== this.props.radius) {
      this.props.setSelectedOptions([])
      this.props.getOptions({
        group: this.props.group,
        key: this.props.yelp_token,
        coords,
        radius: this.props.radius,
        time: {
          timeOption: this.props.timeOption,
          timeValue: this.props.timeValue,
        },
      })
    }
  }

  static navigationOptions = {
    title: 'Pick',
    header: null,
  }

  getHeaderTitle = () => {
    const {
      group: { label },
      options,
    } = this.props
    const num = 3 - this.props.selectedOptions.length
    return `Select (${num}) ${label}`
  }

  getEmptyContainer = () => {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header title="No Results" canGoBack hasSettings />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View
              style={{ height: deviceHeight / 6, width: deviceWidth / 2.5 }}
            >
              <Image
                style={{ flex: 1, width: undefined, height: undefined }}
                source={getIcon('empty')}
                resizeMode="contain"
              />
            </View>
            <Text style={this.styles.noResultsText}>
              No results were found! Try adjusting your settings.
            </Text>
          </View>
        </SafeAreaView>
      </View>
    )
  }

  handlePick = option => {
    const { selectedOptions } = this.props
    let updatedState = [...selectedOptions]
    if (_.includes(updatedState.map(x => x.id), option.id)) {
      updatedState.splice(updatedState.indexOf(option), 1)
    } else {
      if (updatedState.length <= 2) {
        updatedState.push(option)
      }
    }
    this.props.setSelectedOptions(updatedState)
  }

  render() {
    if (this.props.isLoading || this.props.options === null) {
      return <Loading />
    }

    if (!this.props.isLoading && _.isEmpty(this.props.options)) {
      return this.getEmptyContainer()
    }

    return (
      <View style={{ width: '100%', height: '100%' }}>
        <SafeAreaView style={this.styles.topSafeView} />
        <SafeAreaView style={this.styles.secondSafeView}>
          <Header title={this.getHeaderTitle()} hasSettings canGoBack />
          <ScrollView
            style={this.styles.scrollContainer}
            contentContainerStyle={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {this.props.options.map((option, i) => {
              const startingPoint =
                this.props.location && this.props.location.coords
                  ? this.props.location.coords
                  : this.props.userProfile &&
                    this.props.userProfile.settings[0] &&
                    this.props.userProfile.settings[0].location.coords

              const { coordinates } = option

              return (
                <TouchableOpacity
                  key={i}
                  style={this.styles.optionContainer}
                  onPress={() => this.handlePick(option)}
                >
                  <View style={this.styles.optionImage}>
                    <Image
                      source={{ uri: option.image_url }}
                      borderTopRightRadius={10}
                      borderTopLeftRadius={10}
                      style={{ flex: 1, width: undefined, height: undefined }}
                      resizeMode="cover"
                    />

                    <View style={this.styles.groupOverlay} />
                  </View>
                  <View
                    style={{
                      ...this.styles.optionInformation,
                      ...{
                        backgroundColor: _.includes(
                          this.props.selectedOptions.map(x => x.id),
                          option.id
                        )
                          ? '#eceefd'
                          : '#fff',
                      },
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      {_.includes(
                        this.props.selectedOptions.map(x => x.id),
                        option.id
                      ) && <View style={this.styles.selectedOverlay} />}
                      <Text style={this.styles.groupText}>{option.name}</Text>
                      <Text style={this.styles.locationText}>
                        {option.location.city} |{' '}
                        {coordinates.latitude && coordinates.longitude
                          ? getDistanceBetweenTwoCoords(
                              startingPoint,
                              coordinates
                            )
                          : '-'}
                      </Text>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                        }}
                      >
                        <View style={this.styles.starsImage}>
                          <Image
                            source={getStarIcon(option.rating)}
                            style={{
                              flex: 1,
                              width: undefined,
                              height: undefined,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                        <Text style={this.styles.reviewsText}>
                          {option.review_count} Reviews
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          {this.props.selectedOptions.length === 3 && (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.push('Decision', { isLeaving: true })
              }
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
    timeOption: state.Settings.timeOption,
    timeValue: state.Settings.timeValue,
    selectedOptions: state.Pick.selectedOptions,
  }
}

export default connect(
  mapStateToProps,
  { getOptions, setSelectedOptions, clearPickState }
)(Pick)
