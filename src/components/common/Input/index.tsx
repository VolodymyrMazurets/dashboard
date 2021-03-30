import React, { FC } from 'react';
import { Input as AntInput } from 'antd';
import classNames from 'classnames';
import { Icon, IconTypes } from '../Icon';

export const inputTestId = 'input';

type AntTypes = AntInput['props'];

interface Props extends AntTypes {
  icon?: IconTypes;
}

export const Input: FC<Props> = (props) => {
  const { icon, className, value } = props;
  return (
    <AntInput
      {...props}
      data-testid={inputTestId}
      prefix={icon && <Icon name={icon} />}
      className={classNames({ _filled: !!value }, className)}
    />
  );
};
