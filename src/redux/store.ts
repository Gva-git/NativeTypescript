import {configureStore} from '@reduxjs/toolkit';
import {reducer as formReducer} from 'redux-form';
import loginAuthSlice from './slices/loginAuthSlice';
import userSlice from './slices/userSlice';
import {individualUserSlice} from './slices/userSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    loginSlice: loginAuthSlice.reducer,
    userList: userSlice,
    singleUser: individualUserSlice.reducer,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export const authUser = (state: ApplicationState) => state.loginSlice;
export const userList = (state: ApplicationState) => state.userList;
export const singleUser = (state: ApplicationState) => state.singleUser;

export {store};
