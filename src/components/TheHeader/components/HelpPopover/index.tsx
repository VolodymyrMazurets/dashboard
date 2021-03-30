import './TheHeaderHelpPopover.scss';

import { Divider, Popover, Row } from 'antd';
import { GroupButton, IconButton } from '../../../common';
import React, { FC, useState } from 'react';

interface Props {
  className?: string;
}

export const TheHeaderHelpPopover: FC<Props> = ({ className, children }) => {
  const [visible, setVisible] = useState(false);

  const renderHeader = () => {
    return (
      <Row
        justify="space-between"
        align="middle"
        className="TheHeaderHelpPopover__header"
      >
        <span className="TheHeaderHelpPopover__header-title">Quick help</span>
        <IconButton onClick={() => setVisible(false)} icon="close" size={16} />
      </Row>
    );
  };

  const renderContent = () => {
    return (
      <div className="TheHeaderHelpPopover__content">
        <Row justify="space-between">
          <GroupButton className="TheHeaderHelpPopover__link" icon="comments">
            Talk to us
          </GroupButton>
          <GroupButton className="TheHeaderHelpPopover__link" icon="question">
            Help Center
          </GroupButton>
        </Row>
        <Divider />
        <p>Or write us on</p>
        <a
          className="TheHeaderHelpPopover__email"
          href="mailto:support@collabotics.com"
        >
          support@collabotics.com
        </a>
      </div>
    );
  };

  return (
    <Popover
      content={renderContent()}
      title={renderHeader()}
      trigger="click"
      className={className}
      overlayClassName="TheHeaderHelpPopover _arrow-none"
      align={{ offset: [64, 17] }}
      visible={visible}
      placement="bottomRight"
      onVisibleChange={setVisible}
      getPopupContainer={() => document.getElementById('mainApp') as HTMLElement}
    >
      {children}
    </Popover>
  );
};
