 import { combineReducers } from 'redux'
import connectionReducer from './connectionReducer'

const rootReducer = combineReducers({
  connectionStatus: connectionReducer
})

export default rootReducer
