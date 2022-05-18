import {createSlice} from '@reduxjs/toolkit';

interface UserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserList {
  data: UserModel[];
}

type UserState = {
  users: UserList;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: Readonly<UserState> = {
  users: {
    data: [],
  },
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUsers: (state: {isLoading: boolean}) => {
      state.isLoading = true;
    },
    getUserSuccess: (
      state: {users: {data: any}; isLoading: boolean; hasError: boolean},
      {payload}: any,
    ) => {
      state.users = {
        data: [...state.users.data, ...payload.data],
      };
      state.isLoading = false;
      state.hasError = false;
    },
    getUserFailure: (state: {isLoading: boolean; hasError: boolean}) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {getUsers, getUserSuccess, getUserFailure} = userSlice.actions;

export default userSlice.reducer;

export function fetchUser() {
  return async (dispatch: any) => {
    dispatch(getUsers());

    try {
      const response = await fetch(`https://reqres.in/api/users`);
      const userData = await response.json();
      // console.log('userData', userData);
      dispatch(getUserSuccess(userData));
    } catch (error) {
      dispatch(getUserFailure());
    }
  };
}
