import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  paginate: [
    {
      id: 0,
      pagination: {
        keyword: '',
        page: 1,
        take: 10,
        numberRecords: 0,
        pages: 0,
        hasPrev: true,
        hasNext: false,
      },
    },
  ],
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPaginate: (state, action) => {
      const index = state.paginate.findIndex(
        item => item.id === action.payload.id,
      );
      index !== -1
        ? (state.paginate[index].pagination = action.payload.pagination)
        : state.paginate.push(action.payload);
    },
    clearPaginate: (state, action) => {
      const index = state.paginate.findIndex(
        item => item.id === action.payload.id,
      );
      index !== -1 && delete state.paginate[index];
    },
  },
});

export const {setPaginate, clearPaginate} = paginationSlice.actions;
export const selectPaginate = (state: any) => state.pagination.paginate;
export default paginationSlice.reducer;
