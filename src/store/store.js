import { configureStore } from '@reduxjs/toolkit'
import HomeReducer from "../store/reducers/homeSlice"



export default configureStore({
  reducer: {
    home: HomeReducer,
  },
})