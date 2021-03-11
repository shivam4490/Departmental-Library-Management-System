import { combineReducers } from 'redux'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import bookReducer from './bookReducer'

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  books: bookReducer,
})
