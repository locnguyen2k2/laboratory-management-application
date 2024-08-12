import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const borrowingSlice = createSlice({
  name: 'borrowing',
  initialState,
  reducers: {
    setListBorrowing: (state, action) => {
      state.list = action.payload.listBorrowing;
    },
    clearListBorrowing: state => {
      state.list = [];
    },
  },
});

export const {setListBorrowing, clearListBorrowing} = borrowingSlice.actions;
export const selectListBorrowing = (state: any) => state.borrowing.list;
export default borrowingSlice.reducer;
