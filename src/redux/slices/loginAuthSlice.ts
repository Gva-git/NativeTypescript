import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const userData = [
  {
    name: 'Sudar',
    email: 'sudar@gmail.com',
    password: 'aa1122',
    token: 'shudhd23def2r2f23',
  },
  {
    name: 'Jeeva',
    email: 'jeeva@test.com',
    password: '1234567',
    token: 'shdasdhd23def2r2f23',
  },
];

interface LoginAuthModel {
  name: string;
  email: string;
  password: string;
  token: string;
}

type LoginState = {
  user: LoginAuthModel;
  error: string | undefined;
};

const initialState: Readonly<LoginState> = {
  user: {} as LoginAuthModel,
  error: undefined,
};

const loginAuthSlice = createSlice({
  name: 'authentication',
  initialState: initialState,
  reducers: {
    onLogin: (state: LoginState, action: PayloadAction<any>) => {
      try {
        const user = userData.find(user => user.email === action.payload.email);
        if (!user) {
          // state.user = {};
          state.error = 'User not found';
        } else {
          if (user.password === action.payload.password) {
            state.user = user;
            state.error = undefined;
          } else {
            // state.user = {};
            state.error = 'Password incorrect';
          }
        }
      } catch (error) {
        ({
          type: 'ON_ERROR',
          payload: error,
        });
      }
    },
  },
});

export const {onLogin} = loginAuthSlice.actions;
export default loginAuthSlice;
