import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import classNames from 'classnames';
import './Subtle.scss';
import { Icon, IconTypes } from '../Icon';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  iconSize?: number;
  icon?: IconTypes;
}

export const Subtle: FC<Props> = (props) => {
  const { className, children, iconSize = 16, icon } = props;
  return (
    <button
      {...props}
      type="button"
      className={classNames('Subtle', className)}
    >
      <Icon size={iconSize} className="Subtle__icon" name={icon} />
      <span className="Subtle__text">{children}</span>
    </button>
  );
};
