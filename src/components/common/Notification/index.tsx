import "./TheNotification.scss";

import { Icon, IconButton } from "../../common";
import React, { FC } from "react";

import { Row } from "antd";
import cn from "classnames";

type NotificationIcon = 'success-circle' | 'info';

interface Props {
  className?: string;
  icon?: NotificationIcon;
  text?: string;
  date?: string;
  title?: string;
  onDismiss?: () => (void | undefined);
}

export const TheNotification: FC<Props> = ({
  className,
  icon,
  text,
  date,
  title,
  onDismiss,
}) => {
  return (
    <div className={cn(className, "TheNotification")}>
      <Row
        align="middle"
        justify="space-between"
        className="TheNotification__header"
      >
        <Row align="middle">
          <Icon
            size={20}
            name={icon}
            className="TheNotification__icon"
          />
          <span className="TheNotification__header-title">
            {title}
          </span>
        </Row>
        <IconButton onClick={onDismiss} icon="close" size={14} className="TheNotification__btn" />
      </Row>
      <p className="TheNotification__text">{text}</p>
      <Row justify="end">
        <span className="TheNotification__date">{date}</span>
      </Row>
    </div>
  );
};
