import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userReducer/userSlice';
import loadingSlice from './loadingSlice';
import verticalNavSlice from './verticalNavSlice';
import borrowingSlice from './borrowingReducer/borrowingSlice';
import paginationSlice from './paginationReducer/paginationSlice';

export const stores = configureStore({
  reducer: {
    auth: userSlice,
    loadingState: loadingSlice,
    verticalNav: verticalNavSlice,
    borrowing: borrowingSlice,
    pagination: paginationSlice,
  },
});
