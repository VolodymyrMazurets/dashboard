import { Badge } from 'antd';
import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import Icon from '../Icon';
import { Loader } from '../Loader';

export type StatusBaadgeType = 'success' | 'warning' | 'danger' | 'loading';

interface Props {
  className?: string;
  type?: StatusBaadgeType;
  count?: number;
}

export enum StatusBadgeColors {
  success = 'transparent',
  danger = '#d4483e',
  warning = '#e78131',
  loading = 'transparent',
}

export const StatusBadge: FC<Props> = ({
  className,
  count,
  type = 'danger',
}) => {
  const background = useMemo(() => ({ background: StatusBadgeColors[type] }), [
    type,
  ]);

  switch (type) {
    case 'loading':
      return <Loader type="spin" className={className} size={20} active />;
    case 'success':
      return (
        <Icon className={className} name="success-circle-pure" size={20} />
      );
    default:
      return (
        <Badge
          count={count}
          className={classNames('_circle', className)}
          style={{ ...background }}
        />
      );
  }
};
