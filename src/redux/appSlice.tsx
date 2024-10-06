import {createSlice} from '@reduxjs/toolkit';
import * as RootNavigation from './../helps/RootNavigation';

const initialState: any = {
  history: [],
  formError: {formLogin: [], formSignup: [], formRePassword: []},
};

export const appState = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setFormError: (state, action) => {
      if (action.payload?.name) {
        let newErrors: any = state.formError[`${action.payload.form}`].filter(
          (error: any) => error.name !== action.payload.name,
        );
        newErrors.push({
          name: action.payload.name,
          error: action.payload.error,
        });
        state.formError[`${action.payload.form}`] = newErrors;
      } else {
        state.formError[`${action.payload.form}`] = [];
      }
    },
    setHistory: (state, action) => {
      const currentHistory = state.history;
      const data: any = action.payload.history
        ? action.payload.history
        : RootNavigation.navigationRef.getRootState().history;
      const tabName = data[1].id
        ? `${data[1].key.split('-')[0]}-${data[1].id}`
        : data[1].key.split('-')[0];

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

export const {setHistory, popHistory, setFormError} = appState.actions;
export const getHistory = (state: any) => state.appState.history;
export const getFormSignup = (state: any) =>
  state.appState.formError.formSignup.some((item: any) => item.error === true);
export const getFormSignin = (state: any) =>
  state.appState.formError.formLogin.some((item: any) => item.error === true);
export const getFormRePass = (state: any) =>
  state.appState.formError.formRePassword.some(
    (item: any) => item.error === true,
  );
export default appState.reducer;
