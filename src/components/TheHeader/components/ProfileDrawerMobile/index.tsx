import "./TheHeaderProfileDrawerMobile.scss";

import { Avatar, Badge, Divider, Drawer, Row, Switch } from "antd";
import {
  DropdownSelect,
  IconButton,
  Link,
  StatusBadge,
  Subtle,
} from "../../../common";
import React, { FC, useContext, useEffect, useState } from "react";

import { RevisionResponceType } from "../../../../services/http/types";
import { RootState } from "../../../../store/types";
import { ThemeContext } from "../../../../context/ThemeContext";
import { UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { useSelector } from "react-redux";

interface Props {
  className?: string;
  name?: string;
  avatar?: string;
  email?: string;
}

export const TheHeaderProfileDrawerMobile: FC<Props> = ({
  className,
  avatar,
  email,
  name,
}) => {
  const [visible, setVisible] = useState(false);
  const { darkTheme, switchTheme } = useContext(ThemeContext);
  const [definition, setDefinition] = useState<string>();
  const [revision, setRevision] = useState<string>();
  const [revisions, setRevisions] = useState<RevisionResponceType[]>();

  const { count } = useSelector(
    ({ backgroundTasksState }: RootState) => backgroundTasksState
  );

  const { definitions } = useSelector(
    ({ definitionsState }: RootState) => definitionsState
  );

  useEffect(() => {
    const item = (definitions || []).find((i) => i.Id === definition)?.Revisions
    setRevisions(item);
}, [definitions, definition]);

  const renderContent = () => {
    return (
      <div className="TheHeaderProfileDrawerMobile__drawer">
        <div>
          <Row className="TheHeaderProfileDrawerMobile__header">
            <Avatar
              icon={<UserOutlined />}
              size={40}
              src={avatar}
              className="TheHeaderProfileDrawerMobile__avatar"
            />
            <div className="TheHeaderProfileDrawerMobile__name-wrapper">
              <h2 className="TheHeaderProfileDrawerMobile__name">{name}</h2>
              <a
                className="TheHeaderProfileDrawerMobile__email"
                href={`mailto:${email}`}
              >
                {email}
              </a>
            </div>
          </Row>
          <Divider className="TheHeaderProfileDrawerMobile__divider _marginless" />

          <div className="TheHeaderProfileDrawerMobile__dropdowns">
            <DropdownSelect
              value={definition}
              onChange={(value) => setDefinition(value)}
              data={definitions}
              placeholder="Definitions"
              className="TheHeaderProfileDrawerMobile__select"
            />
            <DropdownSelect
              disabled={!definition}
              value={revision}
              onChange={(value) => setRevision(value)}
              data={revisions}
              placeholder="Revisions"
              className="TheHeaderProfileDrawerMobile__select _last"
            />
            <div className="TheHeaderProfileDrawerMobile__status">
              <StatusBadge
                count={count || 0}
                type="danger"
                className="TheHeaderProfileDrawerMobile__notification-badge"
              />
              <span className="TheHeaderProfileDrawerMobile__status-text">
                Validation Status: Error
              </span>
            </div>
          </div>

          <Divider className="TheHeaderProfileDrawerMobile__divider _marginless" />
          <div className="TheHeaderProfileDrawerMobile__content">
            <ul>
              <li className="TheHeaderProfileDrawerMobile__item">
                <Link icon="preferences">Profile settings</Link>
              </li>
              <li className="TheHeaderProfileDrawerMobile__item">
                <Link icon="settings">Preferences</Link>
              </li>
              <li className="TheHeaderProfileDrawerMobile__item"></li>
            </ul>
          </div>
          <Divider className="TheHeaderProfileDrawerMobile__divider _marginless" />
          <div className="TheHeaderProfileDrawerMobile__block">
            <Row
              justify="space-between"
              align="middle"
              style={{ marginBottom: 16 }}
            >
              <Link icon="moon" onClick={() => switchTheme}>
                Dark mode
              </Link>
              <Switch
                size="small"
                checked={!!darkTheme}
                onChange={switchTheme}
              />
            </Row>
            <Link icon="sign-out">Sign out</Link>
          </div>
        </div>
        <div className="TheHeaderProfileDrawerMobile__footer">
          <Divider className="TheHeaderProfileDrawerMobile__divider _marginless" />
          <Row
            justify="center"
            align="middle"
            className="TheHeaderProfileDrawerMobile__footer-row"
          >
            <Subtle
              icon="comments"
              className="TheHeaderProfileDrawerMobile__footer-btn"
            >
              Talk to us
            </Subtle>
            <Subtle icon="question">Help Center</Subtle>
          </Row>
          <Row justify="center" align="middle" style={{ padding: "0 20px" }}>
            <p className="TheHeaderProfileDrawerMobile__footer-text">
              Or write us on
            </p>
            <a
              className="TheHeaderHelpPopover__email"
              href="mailto:support@collabotics.com"
            >
              support@collabotics.com
            </a>
          </Row>
        </div>
      </div>
    );
  };

  return (
    <div className={classNames("TheHeaderProfileDrawerMobile", className)}>
      <Badge dot={true}>
        <IconButton
          onClick={() => setVisible(true)}
          size={18}
          icon="menu-mobile"
          className="TheHeaderProfileDrawerMobile__btn"
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
