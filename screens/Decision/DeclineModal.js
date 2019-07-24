import React, { Component } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { color } from '../../utils/styles'
import Modal from 'react-native-modal'
import { ScaledSheet } from 'react-native-size-matters'

const styles = ScaledSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    padding: '15@ms',
    backgroundColor: '#FFF',
    alignItems: 'center',
    display: 'flex',
  },
  footer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomLeftRadius: '10@ms',
    borderBottomRightRadius: '10@ms',
    borderTopColor: '#FFF',
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  header: {
    padding: '15@ms',
    backgroundColor: '#FFF',
    borderTopRightRadius: '10@ms',
    borderTopLeftRadius: '10@ms',
    borderBottomColor: '#C8C8C8',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: '16@ms',
    fontWeight: '400',
    color: color.dark,
  },
  title: {
    fontSize: '20@ms',
    fontWeight: '400',
    color: color.dark,
  },
  contentText: {
    fontSize: '16@ms',
    textAlign: 'center',
    lineHeight: '23@vs',
  },
  continueText: {
    fontSize: '17@ms',
    color: '#FFF',
    fontWeight: '500',
  },
  cancelText: {
    fontSize: '17@ms',
    color: '#C8C8C8',
    fontWeight: '500',
  },
  continue: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.primary,
    borderBottomLeftRadius: '10@ms',
    padding: '15@ms',
  },
  cancel: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: '#FFF',
    borderLeftWidth: '1@ms',
    borderStyle: 'solid',
    borderBottomRightRadius: '10@ms',
    backgroundColor: '#F6F6F6',
    padding: '15@ms',
  },
})

export default class DeclineModal extends Component {
  render() {
    return (
      <Modal style={styles.modal} isVisible={this.props.isVisible}>
        <View style={styles.header}>
          <Text style={styles.title}> Decline Decision </Text>
        </View>
        <View style={styles.modalContent}>
          <Text style={styles.contentText}>
            Not a fan of {this.props.name}? No worries. But you will have to
            start from the beginning...
          </Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continue}
            onPress={this.props.handleDecline}
          >
            <Text style={styles.continueText}> Continue </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancel}
            onPress={this.props.toggleModal}
          >
            <Text style={styles.cancelText}> Cancel </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }
}
