import React, { DOMAttributes, FC } from 'react';
import classNames from 'classnames';
import './AvatarBadge.scss';
import { Avatar } from 'antd';

export const avatarBadgeTestId = 'app-badge';

interface Props {
  className?: string;
  name?: string;
  image?: string;
  size?: number;
  vertical?: boolean;
  disabled?: boolean;
  fontSize?: number;
  fontWeight?: 400 | 500 | 700;
  onClick?: DOMAttributes<HTMLButtonElement>['onClick'];
}

export const AvatarBadge: FC<Props> = ({
  className,
  image,
  name,
  vertical,
  disabled,
  size = 24,
  fontSize = 15,
  fontWeight = 400,
  children,
  onClick,
}) => {
  return (
    <button
      onClick={(e) => onClick && !disabled && onClick(e)}
      data-testid={avatarBadgeTestId}
      disabled={disabled}
      className={classNames('AvatarBadge', { _vertical: vertical }, className)}
    >
      {children ? (
        <div className="AvatarBadge__image">{children}</div>
      ) : (
        <Avatar src={image} size={size} className="AvatarBadge__image" />
      )}
      <span
        className="AvatarBadge__name"
        style={{ fontSize: `${fontSize}px`, fontWeight }}
      >
        {name}
      </span>
    </button>
  );
};
