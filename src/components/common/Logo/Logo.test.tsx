import React from 'react';
import { render } from '@testing-library/react';
import { Logo, logoTestId } from './index';

describe('Logo', () => {
  test('render Logo', () => {
    const { getByTestId } = render(<Logo />);

    const element = getByTestId(logoTestId);

    expect(element).toBeInTheDocument();
  });

  test('render Logo with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(<Logo className={testClass} />);

    expect(getByTestId(logoTestId)).toHaveClass(testClass);
  });

  test('render Logo with size prop', () => {
    const size = 32;
    const { getByTestId } = render(<Logo size={size} />);

    const element = getByTestId(logoTestId);
    expect(element).toHaveAttribute('width', String(size));
    expect(element).toHaveAttribute('height', String(size));
  });
});
