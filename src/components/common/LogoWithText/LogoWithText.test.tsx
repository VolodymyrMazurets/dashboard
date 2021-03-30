import React from 'react';
import { render } from '@testing-library/react';
import { LogoWithText, logoWithTextTestId } from './index';

describe('LogoWithText', () => {
  test('render LogoWithText', () => {
    const { getByTestId } = render(<LogoWithText />);

    const element = getByTestId(logoWithTextTestId);

    expect(element).toBeInTheDocument();
  });

  test('render LogoWithText with custom class', () => {
    const testClass = 'test-class';
    const { getByTestId } = render(<LogoWithText className={testClass} />);

    expect(getByTestId(logoWithTextTestId)).toHaveClass(testClass);
  });
});
