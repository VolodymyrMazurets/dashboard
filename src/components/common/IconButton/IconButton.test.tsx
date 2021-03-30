import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { IconButton, iconButtonTestId } from './index';

const iconName = 'app';

describe('IconButton', () => {
  test('render IconButton', () => {
    const { getByTestId } = render(<IconButton icon={iconName} />);

    const element = getByTestId(iconButtonTestId);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('IconButton');
    element.focus();
    expect(element).toHaveFocus();
  });

  test('render IconButton with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(
      <IconButton className={testClass} icon={iconName} />
    );

    expect(getByTestId(iconButtonTestId)).toHaveClass(testClass);
  });

  test('render IconButton with disabled', () => {
    const { getByTestId } = render(<IconButton disabled icon={iconName} />);

    expect(getByTestId(iconButtonTestId)).toHaveAttribute('disabled');
  });

  test('render IconButton with size prop', () => {
    const size = 32;
    const wrapper = shallow(<IconButton icon={iconName} size={size} />);

    expect(wrapper.html()).toMatch(`width:${size}px`);
    expect(wrapper.html()).toMatch(`height:${size}px`);
  });

  test('should execute “click” handler on IconButton click', () => {
    const clickSpy = jest.fn();
    const wrapper = shallow(<IconButton icon={iconName} onClick={clickSpy} />);

    wrapper.simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
