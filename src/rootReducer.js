import {combineReducers} from 'redux'
import containerReducers from './containers/reducer'

export default combineReducers(Object.assign({},containerReducers))