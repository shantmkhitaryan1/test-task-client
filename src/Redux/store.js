import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './auth.slice'
import compaignReducer from './compaign.slice'

const rootReducer = combineReducers({ auth: authReducer, compaign: compaignReducer })
const store = configureStore({
  reducer: rootReducer,
})

export default store
