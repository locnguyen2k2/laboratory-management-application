import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    address: null,
    photo: null,
    email: null,
    status: null,
    role: null,
    isLoggedIn: false,
  },
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      delete action.payload?.createdAt;
      delete action.payload?.updatedAt;
      state.user = {...action.payload};
    },
    clearUser: state => {
      state.user = {
        id: null,
        firstName: null,
        lastName: null,
        address: null,
        photo: null,
        email: null,
        status: null,
        role: null,
        isLoggedIn: false,
      };
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;
export const selectUser = (state: any) => state.auth.user;
export const isAuthenticated = (state: any) => state.auth.isLoggedIn;
export default userSlice.reducer;
