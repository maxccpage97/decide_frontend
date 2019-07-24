import React from 'react'
import { connect } from 'react-redux'

class UserConfig extends React.Component {
  render() {
    return this.props.children
  }
}
export default connect()(UserConfig)
