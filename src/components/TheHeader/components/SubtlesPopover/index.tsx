import "./TheHeaderSubtlesPopover.scss";

import React, { FC, useState } from "react";

import { Popover } from "antd";
import { Subtle } from "../../../common";

interface Props {
  className?: string;
}

export const TheHeaderSubtlesPopover: FC<Props> = ({ className, children }) => {
  const [visible, setVisible] = useState(false);

  const renderContent = () => {
    return (
      <div className="TheHeaderSubtlesPopover__inner">
        <Subtle className="TheHeaderSubtlesPopover__subtle" icon="notebook">
          Investigate Logs
        </Subtle>
        <Subtle className="TheHeaderSubtlesPopover__subtle">Change</Subtle>
        <Subtle className="TheHeaderSubtlesPopover__subtle">Save</Subtle>
        <Subtle className="TheHeaderSubtlesPopover__subtle">Build</Subtle>
      </div>
    );
  };

  return (
    <Popover
      content={renderContent()}
      trigger="click"
      className={className}
      overlayClassName="TheHeaderSubtlesPopover _arrow-none"
      align={{ offset: [-131, 17] }}
      visible={visible}
      placement="bottomLeft"
      onVisibleChange={setVisible}
      getPopupContainer={() => document.getElementById('mainApp') as HTMLElement}
    >
      {children}
    </Popover>
  );
};
