import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AddUserModel {
  // name: string;
  // job: string;
  first_name: string;
  last_name: string;
  email: string;
}

type AddUserState = {
  data: AddUserModel;
  // isLoading: boolean;
  hasError: boolean;
};

const initialState: Readonly<AddUserState> = {
  data: {} as AddUserModel,
  // isLoading: false,
  hasError: false,
};

export const addUserSlice = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    addUserSuccess: (
      state: {
        data: {
          first_name: string;
          last_name: string;
          email: string;
        };
        hasError: boolean;
      },
      {payload}: any,
    ) => {
      state.data = {...state.data, ...payload.data};
    },
    addUserFailure: (state: {hasError: boolean}) => {
      state.hasError = true;
    },
  },
});

export const {addUserSuccess, addUserFailure} = addUserSlice.actions;

export default addUserSlice.reducer;

export function fetchAddUser(data: {
  first_name: string;
  last_name: string;
  email: string;
}) {
  return async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    try {
      const response = await fetch(`https://reqres.in/api/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const singleData = await response.json();
      console.log('addddd', singleData);
      dispatch(addUserSuccess(singleData));
    } catch (hasError) {
      dispatch(addUserFailure());
    }
  };
}
