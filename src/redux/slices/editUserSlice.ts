import {createSlice} from '@reduxjs/toolkit';

interface SingleUserModel {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

interface SingleUserList {
  data: SingleUserModel;
}

type SingleUserState = {
  user: SingleUserList;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: Readonly<SingleUserState> = {
  user: {
    data: {} as SingleUserModel,
  },
  isLoading: false,
  hasError: false,
};

const editUserSlice = createSlice({
  name: 'userIndividual',
  initialState,
  reducers: {
    getIndividualUser: (state: {isLoading: boolean}) => {
      state.isLoading = true;
    },
    getIndividualUserSuccess: (
      state: {user: {data: {}}; isLoading: boolean; hasError: boolean},
      {payload}: any,
    ) => {
      state.user = {
        data: payload.data,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    getIndividualFailure: (state: {isLoading: boolean; hasError: boolean}) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const {
  getIndividualUser,
  getIndividualUserSuccess,
  getIndividualFailure,
} = editUserSlice.actions;

export default editUserSlice.reducer;

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
