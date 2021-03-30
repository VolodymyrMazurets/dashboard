import React, { DOMAttributes, FC } from 'react';
import classNames from 'classnames';
import { Icon, IconTypes } from '../Icon';
import './GroupButton.scss';

export const groupButtonTestId = 'group-button';

interface Props {
  icon: IconTypes;
  className?: string;
  size?: number;
  disabled?: boolean;
  onClick?: DOMAttributes<HTMLButtonElement>['onClick'];
}

export const GroupButton: FC<Props> = ({
  className,
  icon,
  size = 24,
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      data-testid={groupButtonTestId}
      onClick={onClick}
      className={classNames('GroupButton', className)}
    >
      <span className="GroupButton__icon-wrapper">
        <Icon size={size} name={icon} className="GroupButton__icon" />
      </span>
      <span className="GroupButton__name">{children}</span>
    </button>
  );
};
