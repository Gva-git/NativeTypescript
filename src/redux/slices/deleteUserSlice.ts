import {combineReducers, createSlice} from '@reduxjs/toolkit';

type DeleteUserState = {
  // users: UserList;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: Readonly<DeleteUserState> = {
  isLoading: false,
  hasError: false,
};

const deleteUserSlice = createSlice({
  name: 'delete',
  initialState,
  reducers: {
    deletedUserSuccess: (
      state: {isLoading: boolean; hasError: boolean},
      {payload}: any,
    ) => {
      state.isLoading = true;
      state.hasError = false;
    },
    deleteUserFailure: (state: {isLoading: boolean; hasError: boolean}) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {deletedUserSuccess, deleteUserFailure} = deleteUserSlice.actions;

export default deleteUserSlice.reducer;

export function fetchDeleteUser(id: number) {
  return async (dispatch: any) => {
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id),
      });
      const deleteData = await response.json();
      console.log('response', deleteData);
      dispatch(deletedUserSuccess(deleteData));
    } catch (error) {
      dispatch(deleteUserFailure());
    }
  };
}
