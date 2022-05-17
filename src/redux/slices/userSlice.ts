import {createSlice} from '@reduxjs/toolkit';

interface UserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface UserList {
  data: [];
}

interface SingleUser {
  data: {};
}

// type UserState = {
//   users: UserList;
//   isLoading: boolean;
//   hasError: boolean;
// };

const initialState = {
  users: {
    data: [] as UserModel[],
  },
  isLoading: false,
  hasError: false,
};

const singleInitialState = {
  users: {
    data: {} as SingleUser,
  },
  isLoading: false,
  hasError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    getUsers: state => {
      state.isLoading = true;
    },
    getUserSuccess: (state, {payload}) => {
      state.users = {
        data: [...state.users.data, ...payload.data],
      };
      state.isLoading = false;
      state.hasError = false;
    },
    getUserFailure: state => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

const individualUserSlice = createSlice({
  name: 'userIndividual',
  initialState: singleInitialState,
  reducers: {
    getIndividualUser: state => {
      state.isLoading = true;
    },
    getIndividualUserSuccess: (state, {payload}) => {
      state.users = {
        data: payload.data,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    getIndividualFailure: state => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {getUsers, getUserSuccess, getUserFailure} = userSlice.actions;
export const {
  getIndividualUser,
  getIndividualUserSuccess,
  getIndividualFailure,
} = individualUserSlice.actions;

export default userSlice.reducer;
export {individualUserSlice};

export function fetchUser() {
  return async (dispatch: any) => {
    dispatch(getUsers());

    try {
      // const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const response = await fetch(`https://reqres.in/api/users`);
      const userData = await response.json();
      dispatch(getUserSuccess(userData));
    } catch (error) {
      dispatch(getUserFailure());
    }
  };
}

export function fetchIndividualUser(id: number) {
  return async (dispatch: any) => {
    dispatch(getIndividualUser());

    try {
      // const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const singleData = await response.json();
      console.log('indi', singleData);
      dispatch(getIndividualUserSuccess(singleData));
    } catch (error) {
      dispatch(getIndividualFailure());
    }
  };
}
