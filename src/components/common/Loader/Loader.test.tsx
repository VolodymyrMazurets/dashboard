import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Loader, loaderTestId } from './index';

describe('Loader', () => {
  test('render "spin" active Loader', () => {
    const { getByTestId } = render(<Loader active />);

    const element = getByTestId(loaderTestId);

    expect(element).toHaveClass('_spin');
    expect(element).toHaveClass('Loader');
    expect(element).toBeInTheDocument();
  });

  test('render inactive Loader', () => {
    const wrapper = shallow(<Loader />);

    expect(wrapper.html()).toBeNull();
  });

  test('render Loader with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(<Loader className={testClass} active />);

    expect(getByTestId(loaderTestId)).toHaveClass(testClass);
  });

  test('render "line" active Loader', () => {
    const { getByTestId } = render(<Loader active type="line" />);

    const element = getByTestId(loaderTestId);

    expect(element).toHaveClass('_line');
    expect(element).toBeInTheDocument();
  });
});
