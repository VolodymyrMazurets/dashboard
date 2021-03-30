import React, { AnchorHTMLAttributes, DOMAttributes, FC } from 'react';
import classNames from 'classnames';
import './Link.scss';
import { IconTypes, Icon } from '../Icon';

export const linkTestId = 'link';

interface Props {
  className?: string;
  icon?: IconTypes;
  iconSize?: number;
  href?: AnchorHTMLAttributes<HTMLAnchorElement>['href'];
  onClick?: DOMAttributes<HTMLAnchorElement>['onClick'];
}

export const Link: FC<Props> = ({
  href,
  className,
  children,
  icon,
  iconSize = 18,
  onClick,
}) => {
  return (
    <a data-testid={linkTestId} onClick={onClick} className={classNames('Link', className)} href={href}>
      <Icon size={iconSize} className="Link__icon" name={icon} />
      <span className="Link__text">{children}</span>
    </a>
  );
};
