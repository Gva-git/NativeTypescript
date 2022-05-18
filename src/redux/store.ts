import {configureStore} from '@reduxjs/toolkit';
import {reducer as formReducer} from 'redux-form';
import loginAuthSlice from './slices/loginAuthSlice';
import userSlice from './slices/userSlice';
// import {individualUserSlice} from './slices/userSlice';
import editUserSlice from './slices/editUserSlice';
import addUserSlice from './slices/addUserSlice';
import deleteUserSlice from './slices/deleteUserSlice';
import updateUserSlice from './slices/updateUserSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    loginSlice: loginAuthSlice.reducer,
    userList: userSlice,
    singleUser: editUserSlice,
    addUser: addUserSlice,
    deleteUser: deleteUserSlice,
    updateUser: updateUserSlice,
  },
});

export type ApplicationState = ReturnType<typeof store.getState>;

export const authUser = (state: ApplicationState) => state.loginSlice;
export const userList = (state: ApplicationState) => state.userList;
export const singleUser = (state: ApplicationState) => state.singleUser;
export const addUser = (state: ApplicationState) => state.addUser;
export const deleteUser = (state: ApplicationState) => state.deleteUser;
export const updateUser = (state: ApplicationState) => state.updateUser;

export {store};
