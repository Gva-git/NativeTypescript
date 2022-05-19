import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
// import configureMockStore from 'redux-mock-store';
import LoginScreen from '../src/screens/LoginScreen';
import {store} from '../src/redux/store';
import {debug} from 'react-native-reanimated';

// render login
it('renders Login', () => {
  const {getAllByText, getAllByPlaceholderText} = render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>,
  );

  expect(getAllByText('Login').length).toBe(2);
  getAllByPlaceholderText('Email');
  getAllByPlaceholderText('Password');
});

// when null value
it('shows when no values entered on login form', () => {
  const {getByTestId, getByText} = render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>,
  );

  fireEvent.press(getByTestId('loginButton'));
  getByText('User not found');
});

it('shows invalid password credentials', () => {
  const {getByTestId, getByText, queryAllByText, debug} = render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>,
  );

  fireEvent.changeText(getByTestId('password.field'), '1234567');

  fireEvent.press(getByTestId('loginButton'));

  expect(queryAllByText('Password incorrect').length).toBe(0);

  // debug();
});

it('shows invalid email credentials', () => {
  const {getByTestId, queryAllByText, debug} = render(
    <Provider store={store}>
      <LoginScreen />
    </Provider>,
  );

  fireEvent.changeText(getByTestId('email.field'), 'jeeva@test.com');

  fireEvent.press(getByTestId('loginButton'));

  expect(queryAllByText('User not found').length).toBe(0);

  // debug();
});

it('handles valid input submission', (props: any) => {
  // fetch.mockResponseOnce(JSON.stringify({passes: true}));
  const navigationMock = jest.fn();
  const {getByTestId, getByText, queryAllByText} = render(
    <Provider store={store}>
      <LoginScreen {...props} navigation={{navigation: navigationMock}} />
    </Provider>,
  );

  fireEvent.changeText(getByTestId('email.field'), 'jeeva@test.com');
  fireEvent.changeText(getByTestId('password.field'), '1234567');
  fireEvent.press(getByTestId('loginButton'));
});
