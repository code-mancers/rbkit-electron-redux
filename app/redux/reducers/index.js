 import { combineReducers } from 'redux'
import connectionReducer from './connectionReducer'

const rootReducer = combineReducers({
  connection: connectionReducer
})

export default rootReducer
