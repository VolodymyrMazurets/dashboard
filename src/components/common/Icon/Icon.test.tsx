import React from 'react';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';
import { Icon, iconsTypes, iconTestId } from './index';

describe('Icon', () => {
  Object.values(iconsTypes).forEach((icon) => {
    test(`render Icon "${icon}"`, () => {
      const wrapper = shallow(<Icon name={icon} />);

      expect(wrapper.html()).toMatchSnapshot();
      expect(wrapper.html()).not.toBeNull();
    });
  });
  test('render Loader with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(<Icon className={testClass} name="app" />);

    expect(getByTestId(iconTestId)).toHaveClass(testClass);
  });
  test('render Loader without icon props', () => {
    const wrapper = shallow(<Icon />);

    expect(wrapper.html()).toBeNull();
  });
});
