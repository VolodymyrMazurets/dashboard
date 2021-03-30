import "./TheHeaderNotificationsPopover.scss";

import { ActionTypes, RootState } from "../../../../store/types";
import { Button, Popover, Row } from "antd";
import { Icon, IconButton, TheNotification } from "../../../common";
import React, { FC, useState } from "react";

import { map } from "lodash";
import { notificationsActions } from "../../../../store/modules/notifications";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

interface Props {
  className?: string;
}

export const TheHeaderNotificationsPopover: FC<Props> = ({
  className,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

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

  const handleDismiss = (id: string | undefined): void => {
    dispatch(notificationsActions[ActionTypes.NOTIFICATIONS_DISMISS](id));
  };

  const handleDismissAll = (): void => {
    dispatch(notificationsActions[ActionTypes.NOTIFICATIONS_DISMISS_ALL]());
  };

  const renderHeader = () => {
    return (
      <Row
        justify="space-between"
        align="middle"
        className="TheHeaderNotificationsPopover__header"
      >
        <span className="TheHeaderNotificationsPopover__header-title">
          Notifications
        </span>
        <IconButton onClick={() => setVisible(false)} icon="close" size={16} />
      </Row>
    );
  };

  const renderContent = () => {
    return (
      <div className="TheHeaderNotificationsPopover__content">
        <div className="TheHeaderNotificationsPopover__content-wrapper">
          <Row justify="space-between" style={{ margin: "0 12px" }}>
            <Button
              className="TheHeaderNotificationsPopover__link _with-icon"
              type="link"
            >
              More events in the activity log
              <Icon
                size={24}
                name="arrow-right"
                className="TheHeaderNotificationsPopover__icon"
              />
            </Button>
            <Button
              onClick={handleDismissAll}
              className="TheHeaderNotificationsPopover__link"
              type="link"
            >
              Dismiss all
            </Button>
          </Row>
          <div className="TheHeaderNotificationsPopover__inner">
            <div style={{margin: '0 12px'}}>
              {map(
                notifications,
                ({ Id, Type, Title, Text, NotifiedOnText }) => {
                  return (
                    <TheNotification
                      key={Id}
                      className="TheHeaderNotificationsPopover__notification-item"
                      icon={getIcon(Type)}
                      text={Text}
                      date={NotifiedOnText}
                      title={Title}
                      onDismiss={() => handleDismiss(Id)}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Popover
      content={renderContent()}
      title={renderHeader()}
      trigger="click"
      className={className}
      overlayClassName="TheHeaderNotificationsPopover _arrow-none"
      align={{ offset: [64, 17] }}
      visible={visible}
      placement="bottomRight"
      onVisibleChange={setVisible}
      getPopupContainer={() =>
        document.getElementById("mainApp") as HTMLElement
      }
    >
      {children}
    </Popover>
  );
};
