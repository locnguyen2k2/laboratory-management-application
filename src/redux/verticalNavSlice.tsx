import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isTrue: false,
};

export const verticalNav = createSlice({
  name: 'verticalNAv',
  initialState,
  reducers: {
    setVerticalNav: (state, action) => {
      state.isTrue = action.payload;
    },
  },
});

export const {setVerticalNav} = verticalNav.actions;
export const selectVerticalNav = (state: any) => state.verticalNav.isTrue;
export default verticalNav.reducer;
