import React, { FC } from 'react';
import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { Icon, IconTypes } from '../Icon';
import './Search.scss';

export const inputTestId = 'search';

type AntTypes = AntInput['props'];

interface Props extends AntTypes {
  icon?: IconTypes;
}

export const Search: FC<Props> = (props) => {
  const { icon, className, value } = props;
  return (
    <AntInput
      {...props}
      data-testid={inputTestId}
      prefix={icon && <Icon name={icon} size={20} />}
      className={classNames('Search', { _filled: !!value }, className)}
    />
  );
};
