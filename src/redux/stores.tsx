import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userReducer/userSlice';
import loadingSlice from './loadingSlice';
import verticalNavSlice from './verticalNavSlice';
import borrowingSlice from './borrowingReducer/borrowingSlice';

export const stores = configureStore({
  reducer: {
    auth: userSlice,
    loadingState: loadingSlice,
    verticalNav: verticalNavSlice,
    borrowing: borrowingSlice,
  },
});
