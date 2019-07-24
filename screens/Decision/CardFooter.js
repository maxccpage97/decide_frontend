import React from 'react'
import { View, TouchableOpacity, Text, Image } from 'react-native'
import { color, getIcon, deviceWidth, deviceHeight } from '../../utils/styles'
import { ScaledSheet } from 'react-native-size-matters'

const styles = ScaledSheet.create({
  container: {
    flex: 0.25,
    borderBottomLeftRadius: '15@ms',
    borderBottomRightRadius: '15@ms',
    flexDirection: 'row',
    borderTopColor: '#FFF',
    borderTopWidth: '1@ms',
    borderStyle: 'solid',
  },
  accept: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: color.primary,
    borderBottomLeftRadius: '15@ms',
  },
  accepted: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: color.primary,
    borderBottomLeftRadius: '15@ms',
    borderBottomRightRadius: '15@ms',
  },
  decline: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#FFF',
    borderLeftWidth: '1@ms',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderBottomRightRadius: '15@ms',
    backgroundColor: '#F6F6F6',
  },
  icon: {
    width: deviceWidth / 12,
    height: deviceHeight / 32,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  declineText: {
    color: '#C8C8C8',
    marginRight: '2.5@ms',
    fontSize: '18@ms',
    fontWeight: '500',
  },
  acceptText: {
    color: '#FFF',
    marginRight: '2.5@ms',
    fontSize: '18@ms',
    fontWeight: '500',
  },
})

export const Footer = props => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={props.toggleAcceptModal}
      style={!props.accepted ? styles.accept : styles.accepted}
    >
      <Text style={styles.acceptText}>
        {props.accepted ? 'Accepted' : 'Accept'}
      </Text>
      <View style={styles.icon}>
        <Image
          source={getIcon('accept')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
    {!props.accepted && (
      <TouchableOpacity
        onPress={props.toggleDeclineModal}
        style={styles.decline}
      >
        <Text style={styles.declineText}>Decline</Text>
        <View style={styles.icon}>
          <Image
            source={getIcon('decline')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
      </TouchableOpacity>
    )}
  </View>
)
