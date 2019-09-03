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
  Animated,
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
  getDecision,
  handleDecision,
  clearDecision,
  addImpression,
} from './actions'
import yelpLogo from '../../assets/Yelp_trademark_RGB_outline.png'
import { Footer } from './CardFooter'
import CollapsableTabs from './CollapsableTabs'
import moment from 'moment'
import DeclineModal from './DeclineModal'
import AcceptModal from './AcceptModal'
import { createOpenLink } from 'react-native-open-maps'

const getData = props => {
  const {
    group: { label },
    selectedCategories,
    yelp_token,
  } = props
  const hasCategories =
    label === 'Restaurants' ||
    label === 'Experiences' ||
    label === 'Nightlife' ||
    label === 'Desserts'

  const coords =
    props.location && props.location.coords
      ? props.location.coords
      : props.userProfile &&
        props.userProfile.settings[0] &&
        props.userProfile.settings[0].location.coords

  props.getDecision({
    key: yelp_token,
    coords,
    radius: props.radius,
    time: {
      timeOption: props.timeOption,
      timeValue: props.timeValue,
    },
    options: hasCategories
      ? selectedCategories.map(cat => cat.alias)
      : props.group.alias,
    hasCategories,
  })
}

class Decision extends Component {
  constructor(props) {
    super(props)

    getData(props)
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
    container: {
      flex: 1,
      padding: '15@ms',
      backgroundColor: color.white,
    },
    cardContainer: {
      flex: 1,
      shadowOffset: { width: 1, height: -1 },
      shadowColor: '#796A6A',
      shadowOpacity: 0.5,
      elevation: 5,
      borderRadius: '15@ms',
      backgroundColor: '#FFF',
    },
    topContainer: {
      width: '100%',
      height: '50%',
      borderTopLeftRadius: '15@ms',
      borderTopRightRadius: '15@ms',
      overflow: 'hidden',
      position: 'relative',
    },
    imageOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: 0.7,
      borderTopLeftRadius: '15@ms',
      borderTopRightRadius: '15@ms',
      backgroundColor: '#796A6A',
      padding: '10@ms',
    },
    basicContainer: {
      width: '100%',
      position: 'absolute',
      height: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      padding: '10@ms',
    },
    title: {
      fontSize: '25@ms',
      fontWeight: '500',
      color: '#FFFFFF',
      overflow: 'hidden',
      marginLeft: '-5@ms',
      marginBottom: '5@ms',
    },
    quickInfoText: {
      fontSize: '17@ms',
      fontWeight: '400',
      color: '#FFFFFF',
      marginLeft: 10,
      overflow: 'hidden',
    },
    radiusText: {
      fontSize: '15.5@ms',
      fontWeight: '400',
      color: '#FFFFFF',
      marginLeft: 5,
      overflow: 'hidden',
    },
    starsImage: {
      height: '30@vs',
      width: '130@s',
      overflow: 'hidden',
    },
    starsImageTwo: {
      height: '30@vs',
      width: '100@s',
      overflow: 'hidden',
    },
    logo: {
      position: 'absolute',
      right: '-2.5@s',
      height: '50@vs',
      width: '100@s',
    },
    quickInfoContainer: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
    },
    clockIcon: {
      width: deviceWidth / 14,
      height: deviceHeight / 30,
      marginTop: '5@ms',
      marginBottom: '5@ms',
    },
    priceIcon: {
      width: deviceWidth / 13,
      height: deviceHeight / 30,
      marginTop: 5,
      marginBottom: 5,
    },
    rangeIcon: {
      width: deviceWidth / 11,
      height: deviceHeight / 30,
      marginTop: 5,
      marginBottom: 5,
    },
    image: { flex: 1, width: undefined, height: undefined },
    reviewContainer: {
      marginTop: '10@ms',
    },
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

  state = {
    accept: false,
    decline: false,
    accepted: false,
  }

  static navigationOptions = {
    title: 'Decision',
    header: null,
  }

  componentDidMount() {
    this.willBlurListener = this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.props.clearDecision()
      }
    )
  }

  componentWillUnmount() {
    this.willBlurListener.remove()
  }

  getOpenTime = () => {
    const {
      timeOption,
      timeValue,
      listing: { hours },
    } = this.props

    let day
    let hour
    let amp
    if (timeOption === 0) {
      day = new Date().getDay()
    } else {
      day = new Date(timeValue).getDay()
    }
    const businessDay =
      _.first(hours) && _.first(hours).open[day]
        ? _.first(hours).open[day].end
        : null
    if (businessDay) {
      const hour24 = parseInt(
        businessDay
          .split('')
          .slice(0, 2)
          .join('')
      )
      if (hour24) {
        if (hour24 >= 12) {
          amp = 'PM'
          hour = hour24 - 12
        } else if (hour24 < 12) {
          amp = 'AM'
          hour = hour24
        }
        const minutes = businessDay
          .split('')
          .slice(2)
          .join('')

        return `${hour}:${minutes} ${amp}`
      }
    }
    return '-'
  }

  toggleDeclineModal = () => {
    this.setState(oldState => ({
      decline: !oldState.decline,
    }))
  }

  toggleAcceptModal = () => {
    if (!this.props.accepted) {
      const {
        listing,
        userProfile: { _id, decisions },
        date,
      } = this.props
      const businessId = listing.id
      const item = { businessId, date }

      this.props.handleDecision({
        _id,
        decisions: [...decisions, item],
      })
    }
    this.setState(oldState => ({
      accept: !oldState.accept,
    }))
  }

  handleReset = () => {
    const {
      listing,
      userProfile: { _id, impressions },
      date,
    } = this.props
    const businessId = listing.id
    const item = { businessId, date }
    this.props.addImpression({ _id, impressions: [...impressions, item] })
    this.setState({
      decline: false,
    })
    getData(this.props)
  }

  render() {
    const { isLoading, listing, isEmpty } = this.props
    if (isEmpty) {
      return (
        <View style={{ width: '100%', height: '100%' }}>
          <SafeAreaView style={this.styles.topSafeView} />
          <SafeAreaView style={this.styles.secondSafeView}>
            <Header title="No Results" canGoBack hasSettings />
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
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
    if (isLoading || !listing || _.isEmpty(listing)) {
      return <Loading />
    } else {
      const {
        listing: {
          coordinates: { latitude, longitude },
          name,
        },
        userProfile: { deviceType },
      } = this.props
      const params =
        deviceType === 'Apple'
          ? { latitude, longitude, query: name, zoom: 0 }
          : { query: `${latitude},${longitude}`, provider: 'google', zoom: 10 }
      const openLink = createOpenLink(params)
      return (
        <View style={{ width: '100%', height: '100%' }}>
          <SafeAreaView style={this.styles.topSafeView} />
          <SafeAreaView style={this.styles.secondSafeView}>
            <Header logo accepted canGoBack={!this.props.accepted} />
            <View style={this.styles.container}>
              <DeclineModal
                handleReset={this.handleReset}
                name={listing.name}
                isVisible={this.state.decline}
                toggleModal={this.toggleDeclineModal}
              />
              <AcceptModal
                openInMaps={openLink}
                name={listing.name}
                isVisible={this.state.accept}
                toggleModal={this.toggleAcceptModal}
              />
              <View style={this.styles.cardContainer}>
                <View style={this.styles.topContainer}>
                  <Image
                    source={{ uri: listing.image_url }}
                    borderTopRightRadius={15}
                    borderTopLeftRadius={15}
                    style={this.styles.image}
                    resizeMode="cover"
                  />

                  <View style={this.styles.imageOverlay} />
                  <View style={this.styles.basicContainer}>
                    <Text style={this.styles.title}> {listing.name} </Text>
                    <View style={this.styles.quickInfoContainer}>
                      <View style={this.styles.clockIcon}>
                        <Image
                          source={getIcon('clock')}
                          style={this.styles.image}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={this.styles.quickInfoText}>
                        Open until {this.getOpenTime()}
                      </Text>
                    </View>
                    <View style={this.styles.quickInfoContainer}>
                      <View style={this.styles.priceIcon}>
                        <Image
                          source={getIcon('price')}
                          style={this.styles.image}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={this.styles.quickInfoText}>
                        {listing.price || '-'} / $$$$
                      </Text>
                    </View>
                    <View style={this.styles.quickInfoContainer}>
                      <View style={this.styles.rangeIcon}>
                        <Image
                          source={getIcon('range-white')}
                          style={this.styles.image}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={this.styles.quickInfoText}>
                        {_.round(listing.distance / 1000, 1) || '-'}km from you
                      </Text>
                    </View>
                    <View
                      style={{
                        ...this.styles.quickInfoContainer,
                        ...this.styles.reviewContainer,
                      }}
                    >
                      <View style={this.styles.starsImage}>
                        <Image
                          source={getStarIcon(listing.rating)}
                          style={this.styles.image}
                          resizeMode="contain"
                        />
                      </View>
                      <Text style={this.styles.quickInfoText}>
                        {this.props.reviewCount || '-'} Reviews
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ flex: 0.75 }}>
                  <CollapsableTabs
                    reviewCount={this.props.reviewCount}
                    reviews={this.props.reviews}
                    listing={listing}
                  />
                </View>
                <Footer
                  accepted={this.props.accepted}
                  toggleAcceptModal={this.toggleAcceptModal}
                  toggleDeclineModal={this.toggleDeclineModal}
                />
              </View>
            </View>
          </SafeAreaView>
        </View>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    reviews: state.Decision.reviews,
    reviewCount: state.Decision.reviewCount,
    group: state.Group.group,
    selectedCategories: state.Categories.selectedCategories,
    isLoading: state.Decision.isLoading,
    yelp_token: state.UserConfig.yelp_token,
    accepted: state.Decision.accepted,
    location: state.Settings.location,
    userProfile: state.UserConfig.userProfile,
    radius: state.Settings.radius,
    listing: state.Decision.listing,
    timeOption: state.Settings.timeOption,
    timeValue: state.Settings.timeValue,
    isEmpty: state.Decision.isEmpty,
    date: state.UserConfig.date,
  }
}

export default connect(
  mapStateToProps,
  { getDecision, handleDecision, clearDecision, addImpression }
)(Decision)
