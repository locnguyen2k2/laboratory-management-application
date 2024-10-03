import {createSlice} from '@reduxjs/toolkit';
import * as RootNavigation from './../helps/RootNavigation';

const initialState: any = {
  history: [],
};

export const appState = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setHistory: (state, action) => {
      const currentHistory = state.history;
      const getHistory: any = action.payload.history
        ? action.payload.history
        : RootNavigation.navigationRef.getRootState().history;
      const tabName = getHistory[1].id
        ? `${getHistory[1].key.split('-')[0]}-${getHistory[1].id}`
        : getHistory[1].key.split('-')[0];

      if (currentHistory[currentHistory.length - 1] !== tabName) {
        if (currentHistory?.length === 10) {
          state.history = [...currentHistory.slice(1), tabName];
        } else {
          state.history = [...currentHistory, tabName];
        }
      }
    },
    popHistory: state => {
      if (state.history.length > 0) {
        state.history.pop();
      }
    },
  },
});

export const {setHistory, popHistory} = appState.actions;
export const getHistory = (state: any) => state.appState.history;
export default appState.reducer;
