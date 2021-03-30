import "./TheMenu.scss";

import { Avatar, Menu } from "antd";
import React, { FC, useState } from "react";

import { Icon } from "../common";
import { PanelResponceItemType } from "../../services/http/types";
import { RootState } from "../../store/types";
import classNames from "classnames";
import { map } from "lodash";
import { useSelector } from "react-redux";

export interface Props {
  width?: string | number;
}

export const TheMenu: FC<Props & Menu["props"]> = (props) => {
  const { className, width = 262 } = props;
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const { panels } = useSelector(({ panelsState }: RootState) => panelsState);

  const renderList = (item: PanelResponceItemType[]) => {
    return map(item, ({ IconUrl, Text, Children }, idx) =>
      !Children ? (
        <Menu.Item key={Text} className="TheMenu__item">
          <div className="TheMenu__icon-wrapper">
            <Avatar
              size={IconUrl ? 19 : 19}
              style={{
                background: IconUrl ? "transparent" : "transparent",
              }}
              className="TheMenu__icon"
              src={IconUrl}
              icon={
                <Icon
                  className="TheMenu__icon-default"
                  name="help-filled"
                  size={19}
                />
              }
            />
          </div>
          <span className="TheMenu__name">{Text}</span>
        </Menu.Item>
      ) : (
        <SubMenu
          key={Text}
          className="TheMenu__item"
          title={Text}
          icon={
            <Avatar
              size={IconUrl ? 19 : 19}
              style={{
                background: IconUrl ? "transparent" : "transparent",
              }}
              className="TheMenu__icon"
              src={IconUrl}
              icon={
                <Icon
                  className="TheMenu__icon-default"
                  name="help-filled"
                  size={19}
                />
              }
            />
          }
        >
          {renderList(Children)}
        </SubMenu>
      )
    );
  };

  return (
    <div
      style={collapsed ? { width: 80 } : { width }}
      className={classNames("TheMenu", className)}
    >
      <button
        className={classNames("TheMenu__collapse-button", {
          _collapsed: collapsed,
        })}
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon size={18} className="TheMenu__collapse-icon" name="angle-right" />
      </button>
      <Menu
        {...props}
        getPopupContainer={() =>
          document.getElementById("mainApp") as HTMLElement
        }
        className={classNames()}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
      >
        {renderList(panels || [])}
      </Menu>
    </div>
  );
};
