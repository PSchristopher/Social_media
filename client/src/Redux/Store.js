import { configureStore }from '@reduxjs/toolkit'
import  userReducer  from './UserSlice'

export default configureStore({
reducer:{
    User:userReducer,
},
})