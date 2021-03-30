import React, { FC } from 'react';
import classNames from 'classnames';
import './Loader.scss';

export const loaderTestId = 'loader';

interface Props {
  className?: string;
  size?: number;
  active?: boolean;
  type?: 'spin' | 'line';
}

export const Loader: FC<Props> = ({
  size = 24,
  type = 'spin',
  active = false,
  className,
}) => {
  if (!active) {
    return null;
  }
  if (type === 'line') {
    return (
      <div data-testid={loaderTestId} className={classNames("Loader _line", className)}>
        <div className="Loader__element"></div>
      </div>
    );
  }
  return (
    <div
      data-testid={loaderTestId}
      className={classNames("Loader _spin", className)}
      style={{ width: size, height: size }}
    >
      <div
        className={'line-spin-fade-loader'}
        style={{ transform: `scale(${size / 60})` }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
          <div key={key} />
        ))}
      </div>
    </div>
  );
};
