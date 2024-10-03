import {configureStore} from '@reduxjs/toolkit';
import userSlice from './userReducer/userSlice';
import loadingSlice from './loadingSlice';
import verticalNavSlice from './verticalNavSlice';
import borrowingSlice from './borrowingReducer/borrowingSlice';
import appSlice from './appSlice.tsx';

export const stores = configureStore({
  reducer: {
    auth: userSlice,
    appState: appSlice,
    loadingState: loadingSlice,
    verticalNav: verticalNavSlice,
    borrowing: borrowingSlice,
  },
});
