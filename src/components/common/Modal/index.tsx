import React, { FC } from 'react';

import { Modal as AntModal } from 'antd';
import { Icon } from '../Icon';
import { ModalProps } from 'antd/lib/modal';

export const Modal: FC<ModalProps> = (props) => {
  const { children } = props;
  return (
    <AntModal {...props} closeIcon={<Icon name="close" size={18} />}>
      {children}
    </AntModal>
  );
};
