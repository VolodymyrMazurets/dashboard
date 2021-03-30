import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { GroupButton, groupButtonTestId } from './index';

const iconName = 'app';

describe('GroupButton', () => {
  test('render GroupButton', () => {
    const { getByTestId } = render(<GroupButton icon={iconName} />);

    const element = getByTestId(groupButtonTestId);

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('GroupButton');
    element.focus();
    expect(element).toHaveFocus();
  });

  test('render GroupButton with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(
      <GroupButton className={testClass} icon={iconName} />
    );

    expect(getByTestId(groupButtonTestId)).toHaveClass(testClass);
  });

  test('render GroupButton with disabled', () => {
    const { getByTestId } = render(<GroupButton disabled icon={iconName} />);

    expect(getByTestId(groupButtonTestId)).toHaveAttribute('disabled');
  });

  test('render GroupButton with children text', () => {
    const text = 'test-text';
    const { getByText } = render(
      <GroupButton icon={iconName}>{text}</GroupButton>
    );

    expect(getByText(text)).toBeInTheDocument();
  });

  test('should execute “click” handler on GroupButton click', () => {
    const clickSpy = jest.fn();
    const wrapper = shallow(<GroupButton icon={iconName} onClick={clickSpy} />);

    wrapper.simulate('click');
    expect(clickSpy).toHaveBeenCalled();
  });
});
