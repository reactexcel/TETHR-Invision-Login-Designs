import {login} from './login/index'
import {entities} from './entities/index'
import {ui} from './ui/index'

import { combineReducers } from 'redux-immutable'

export default combineReducers({
  login,
  entities,
  ui
})
