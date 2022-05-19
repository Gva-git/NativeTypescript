/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {Provider} from 'react-redux';
import {store} from '../src/redux/store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(
    <Provider store={store}>
      <App />
    </Provider>,
  );
});
