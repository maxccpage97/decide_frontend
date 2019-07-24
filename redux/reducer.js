import { combineReducers } from 'redux'
import Home from '../screens/Home/reducer'
import Group from '../screens/Group/reducer'
import Settings from '../screens/Settings/reducer'
import UserConfig from '../wrappers/UserConfig/reducer'
import Pick from '../screens/Pick/reducer'
import Categories from '../screens/Categories/reducer'
import Decision from '../screens/Decision/reducer'

export default combineReducers({
  Home,
  Group,
  Settings,
  UserConfig,
  Pick,
  Categories,
  Decision,
})
