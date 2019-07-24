import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native'
import {
  color,
  deviceHeight,
  deviceWidth,
  getStarIcon,
  getIcon,
} from '../../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'
import burst from '../../assets/Yelp_burst_positive_RGB.png'
import Loading from '../../components/Loading'
import moment from 'moment'
import { BarIndicator } from 'react-native-indicators'

const styles = ScaledSheet.create({
  headerContainer: {
    padding: '10@ms',
    backgroundColor: '#FFF',
    borderBottomColor: '#F6F6F6',
    borderBottomWidth: '3@ms',
    borderStyle: 'solid',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: '19@ms',
    fontWeight: '500',
    color: color.dark,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  yelpLogo: {
    width: '30@s',
    height: '25@vs',
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
    fontWeight: '500',
    color: color.dark,
    marginLeft: '20@ms',
    overflow: 'hidden',
  },
  addressOneText: {
    fontSize: '17@ms',
    fontWeight: '500',
    color: color.dark,
    marginLeft: '20@ms',
    overflow: 'hidden',
  },
  addressTwoText: {
    fontSize: '15@ms',
    fontWeight: '400',
    color: color.dark,
    marginLeft: '20@ms',
    overflow: 'hidden',
  },
  radiusText: {
    fontSize: '15.5@ms',
    fontWeight: '400',
    color: '#FFFFFF',
    marginLeft: '5@ms',
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
  addressContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  phoneContainer: {
    marginTop: '10@ms',
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
  addressIcon: {
    width: deviceWidth / 12,
    height: deviceHeight / 28,
  },
  phoneIcon: {
    width: deviceWidth / 12,
    height: deviceHeight / 28,
  },
  rangeIcon: {
    width: deviceWidth / 11,
    height: deviceHeight / 30,
    marginTop: '5@ms',
    marginBottom: '5@ms',
  },
  reviewContainer: {
    borderStyle: 'solid',
    flex: 1,
    flexDirection: 'row',
    padding: '10@ms',
    borderBottomColor: '#F6F6F6',
  },
  reviewImageContainer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
  reviewImage: {
    height: '80@vs',
    width: '80@s',
  },
  reviewUserName: {
    marginTop: '10@ms',
    color: color.dark,
    fontWeight: '500',
    fontSize: '16@ms',
  },
  reviewInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  reviewDate: {
    fontSize: '15@ms',
    color: color.dark,
    marginLeft: '7.5@ms',
  },
  reviewText: {
    fontSize: '15@ms',
    color: color.dark,
    textAlign: 'center',
  },
  businessInformationContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: '15@ms',
  },
})

const tabs = [
  {
    title: 'Recent Reviews on Yelp',
  },
  {
    title: 'Business Information',
  },
]

const Tab = props => {
  return (
    <View style={{ flex: props.active ? 1 : 0 }}>
      <TouchableOpacity
        onPress={props.onTabPress}
        style={styles.headerContainer}
      >
        <Text style={styles.headerTitle}>{props.title} </Text>
        {props.index === 0 && (
          <View style={styles.yelpLogo}>
            <Image source={burst} style={styles.image} resizeMode="contain" />
          </View>
        )}
      </TouchableOpacity>
      {props.active && (
        <ScrollView style={{ flex: 1 }}>{props.content}</ScrollView>
      )}
    </View>
  )
}

export default class CollapsableTabs extends Component {
  state = {
    activeTab: 0,
  }

  onTabPress = index => {
    this.setState({ activeTab: index })
  }

  getContent = () => {
    const { activeTab } = this.state
    const { reviewCount, reviews, listing } = this.props
    if (activeTab === 1) {
      return (
        <View style={styles.businessInformationContainer}>
          <View style={styles.addressContainer}>
            <View style={styles.addressIcon}>
              <Image
                source={getIcon('address')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <View style={{ display: 'flex' }}>
              <Text style={styles.addressOneText}>
                {listing.location.display_address[0]}
              </Text>
              <Text style={styles.addressTwoText}>
                {listing.location.display_address[1]}
              </Text>
            </View>
          </View>
          <View style={styles.phoneContainer}>
            <View style={styles.phoneIcon}>
              <Image
                source={getIcon('phone')}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.quickInfoText}> {listing.display_phone}</Text>
          </View>
        </View>
      )
    } else {
      return reviews.map((review, i) => {
        return (
          <View
            key={review.id}
            style={{
              ...styles.reviewContainer,
              ...{
                borderBottomWidth: i !== reviews.length - 1 ? 2 : 0,
              },
            }}
          >
            <View style={styles.reviewImageContainer}>
              <View style={styles.reviewImage}>
                <Image
                  source={{ uri: review.user.image_url }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.reviewUserName}>{review.user.name}</Text>
            </View>
            <View style={{ flex: 0.7 }}>
              <View style={styles.reviewInfoContainer}>
                <View style={styles.starsImageTwo}>
                  <Image
                    source={getStarIcon(review.rating)}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.reviewDate}>
                  {moment(review.time_created).format('MMM D YYYY')}
                </Text>
              </View>
              <Text style={styles.reviewText}>"{review.text}"</Text>
            </View>
          </View>
        )
      })
    }
  }

  render() {
    const { reviews } = this.props
    return (
      <View style={{ flex: 1 }}>
        {!reviews ? (
          <BarIndicator count={4} color={color.dark} />
        ) : (
          tabs.map((tab, i) => (
            <Tab
              key={i}
              active={this.state.activeTab === i}
              title={tab.title}
              index={i}
              onTabPress={() => this.onTabPress(i)}
              content={this.getContent()}
            />
          ))
        )}
      </View>
    )
  }
}
