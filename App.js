import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import Home from './screens/Home'
import Group from './screens/Group'
import Settings from './screens/Settings'
import Pick from './screens/Pick'
import Categories from './screens/Categories'
import Decision from './screens/Decision'
import ErrorBoundary from 'react-native-error-boundary'
import ErrorScreen from './components/ErrorScreen'
import UserConfig from './wrappers/UserConfig/index'
import { ERROR } from './appConstants'
import { Provider } from 'react-redux'
import store from './redux/store'

const StackNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Group: {
      screen: Group,
    },
    Settings: {
      screen: Settings,
    },
    Pick: {
      screen: Pick,
    },
    Categories: {
      screen: Categories,
    },
    Decision: {
      screen: Decision,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

class AppNavigator extends Component {
  static router = StackNavigator.router
  render() {
    const { navigation } = this.props
    return (
      <ErrorBoundary
        FallbackComponent={props => (
          <ErrorScreen type={ERROR.UNKNOWN} reset={props.resetError} />
        )}
      >
        <Provider store={store}>
          <UserConfig>
            <StackNavigator navigation={navigation} />
          </UserConfig>
        </Provider>
      </ErrorBoundary>
    )
  }
}
const AppContainer = createAppContainer(AppNavigator)
export default AppContainer
