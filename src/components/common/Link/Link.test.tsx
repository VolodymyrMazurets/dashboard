import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Link, linkTestId } from './index';

describe('Link', () => {
  test('render Link', () => {
    const { getByTestId } = render(<Link />);

    const element = getByTestId(linkTestId);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('Link');
  });

  test('render Link with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(<Link className={testClass} />);

    expect(getByTestId(linkTestId)).toHaveClass(testClass);
  });

  test('render Link with href', () => {
    const testHref = '/test-page';
    const { getByTestId } = render(<Link href={testHref} />);

    expect(getByTestId(linkTestId)).toHaveAttribute('href', testHref);
  });

  test('render Link with icon', () => {
    const wrapper = shallow(<Link icon="app" />);

    expect(wrapper.find('.Link__icon').length).toBe(1);
    expect(wrapper.html()).toMatch('.svg');
  });

  test('should execute “click” handler on Link click', () => {
    const clickSpy = jest.fn();
    const wrapper = shallow(<Link onClick={clickSpy} />);

    wrapper.simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
