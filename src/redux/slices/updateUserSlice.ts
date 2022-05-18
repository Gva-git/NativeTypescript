import {createSlice} from '@reduxjs/toolkit';

interface UpdateUserModel {
  first_name: string;
  last_name: string;
  email: string;
}

type UpdateUserState = {
  data: UpdateUserModel;
  // isLoading: boolean;
  hasError: boolean;
};

const initialState: Readonly<UpdateUserState> = {
  data: {} as UpdateUserModel,
  // isLoading: false,
  hasError: false,
};

const updateUserSlice = createSlice({
  name: 'update',
  initialState,
  reducers: {
    updateUserSuccess: (
      state: {data: {}; hasError: boolean},
      {payload}: any,
    ) => {
      state.data = {...state.data, ...payload.data};
      state.hasError = false;
    },
    updateUserFailure: (state: {hasError: boolean}) => {
      state.hasError = true;
    },
  },
});

export const {updateUserSuccess, updateUserFailure} = updateUserSlice.actions;

export default updateUserSlice.reducer;

export function fetchUpdateUser(
  id: number,
  data: {
    first_name: string;
    last_name: string;
    email: string;
  },
) {
  return async (dispatch: (arg0: {payload: any; type: string}) => void) => {
    console.log('id', id);
    try {
      const response = await fetch(`https://reqres.in/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const updateData = await response.json();
      dispatch(updateUserSuccess(updateData));
      console.log('res from fetch update', updateData);
    } catch (hasError) {
      console.log('hasErr', hasError);
      dispatch(updateUserFailure());
    }
  };
}
