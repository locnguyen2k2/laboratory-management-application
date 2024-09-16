import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

export const loadingState = createSlice({
  name: 'loadingState',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setLoading} = loadingState.actions;
export const getLoading = (state: any) => state.loadingState.isLoading;
export default loadingState.reducer;
