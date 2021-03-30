import { App } from './index';
import React from 'react';
import { shallow } from 'enzyme';

test('render App', () => {
  shallow(<App />);
});
