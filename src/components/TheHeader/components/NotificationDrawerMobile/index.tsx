import "./NotificationDrawerMobile.scss";

import { Badge, Divider, Drawer, Row } from "antd";
import { Icon, IconButton, Subtle, TheNotification } from "../../../common";
import React, { FC, useState } from "react";

import { RootState } from "../../../../store/types";
import classNames from "classnames";
import { map } from "lodash";
import { useSelector } from "react-redux";

interface Props {
  className?: string;
}

export const TheHeaderNotificationDrawerMobile: FC<Props> = ({ className }) => {
  const [visible, setVisible] = useState(false);

  const { notifications } = useSelector(
    ({ notificationsState }: RootState) => notificationsState
  );

  const getIcon = (type: number | undefined) => {
    switch (type) {
      case 0:
        return "success-circle";

      case 2:
        return "info";

      default:
        return "success-circle";
    }
  };

  const renderContent = () => {
    return (
      <div className="TheHeaderNotificationDrawerMobile__drawer">
        <Row className="TheHeaderNotificationDrawerMobile__header">
          <span className="TheHeaderNotificationDrawerMobile__title">
            Notifications
          </span>
        </Row>
        <Divider className="TheHeaderNotificationDrawerMobile__divider _marginless" />
        <div className="TheHeaderNotificationDrawerMobile__content">
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 12 }}
          >
            <Subtle className="TheHeaderNotificationDrawerMobile__link _with-icon">
              More events in the activity log
              <Icon
                size={24}
                name="arrow-right"
                className="TheHeaderNotificationDrawerMobile__icon"
              />
            </Subtle>
            <Subtle className="TheHeaderNotificationsPopover__link">
              Dismiss all
            </Subtle>
          </Row>
          {map(notifications, ({ Id, Type, Title, Text, NotifiedOnText }) => {
            return (
              <TheNotification
                key={Id}
                className="TheHeaderNotificationsPopover__notification-item"
                icon={getIcon(Type)}
                text={Text}
                date={NotifiedOnText}
                title={Title}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={classNames("TheHeaderNotificationDrawerMobile", className)}>
      <Badge
        dot={true}
        className="TheHeaderNotificationDrawerMobile__notification-btn"
        style={{ backgroundColor: "#4396EC" }}
      >
        <IconButton
          size={20}
          icon="notifications"
          onClick={() => setVisible(true)}
        />
      </Badge>
      <Drawer
        getContainer={"#mainApp"}
        bodyStyle={{ padding: 0 }}
        visible={visible}
        width="90%"
        placement="right"
        onClose={() => setVisible(false)}
      >
        {renderContent()}
      </Drawer>
    </div>
  );
};
