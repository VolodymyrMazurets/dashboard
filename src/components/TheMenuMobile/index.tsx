import "./TheMenuMobile.scss";

import { Avatar, Menu } from "antd";
import React, { FC, useEffect, useState } from "react";

import { Icon } from "../common";
import { PanelResponceItemType } from "../../services/http/types";
import { RootState } from "../../store/types";
import SubMenu from "antd/lib/menu/SubMenu";
import classNames from "classnames";
import { map } from "lodash";
import { useSelector } from "react-redux";

export interface MenuItemType {
  name: string;
  key: string;
  icon?: string;
  submenu?: Array<MenuItemType>;
}

export interface Props {
  width?: string | number;
  className?: string;
}

export const TheMenuMobile: FC<Props> = (props) => {
  const { className } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [showExpand, setShowExpand] = useState(false);
  const [subMenu, setSubMenu] = useState<PanelResponceItemType[]>([]);
  const [subMenuActive, setSubMenuActive] = useState(0);
  const { panels } = useSelector(({ panelsState }: RootState) => panelsState);

  const getSlicedPanels = () => {
    if ((panels || []).length > 5) {
      const slicedFirst = panels?.slice(0, 4);
      const slicedSecond = panels?.slice(4, panels.length);

      return {
        firstArr: slicedFirst,
        secondArr: slicedSecond,
      };
    } else {
      return {
        firstArr: panels,
        secondArr: panels,
      };
    }
  };

  const handleClick = (
    activeTab: number,
    children: PanelResponceItemType[]
  ) => {
    setActiveTab(activeTab);
    setSubMenu(children);
    setShowExpand(false);
  };

  useEffect(() => {
    if (panels) {
      setSubMenu(panels[0].Children || []);
    }
  }, [panels]);

  const renderList = (item: PanelResponceItemType[]) => {
    return map(item, ({ IconUrl, Text, Children }, idx) =>
      !Children ? (
        <Menu.Item
          key={Text}
          className="TheMenuMobile__item-menu"
          onClick={() => setShowExpand(false)}
        >
          <div className="TheMenuMobile__icon-wrapper">
            <Avatar
              size={IconUrl ? 19 : 19}
              style={{
                background: IconUrl ? "transparent" : "transparent",
              }}
              className="TheMenuMobile__icon"
              src={IconUrl}
              icon={
                <Icon
                  className="TheMenuMobile__icon-default"
                  name="help-filled"
                  size={19}
                />
              }
            />
          </div>
          <span className="TheMenuMobile__name">{Text}</span>
        </Menu.Item>
      ) : (
        <SubMenu
          key={Text}
          className="TheMenuMobile__item-menu"
          title={Text}
          icon={
            <Avatar
              size={IconUrl ? 19 : 19}
              style={{
                background: IconUrl ? "transparent" : "transparent",
              }}
              className="TheMenuMobile__icon"
              src={IconUrl}
              icon={
                <Icon
                  className="TheMenuMobile__icon-default"
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
    <div className={classNames("TheMenuMobile", className)}>
      {!!subMenu.length && (panels || []).length > 5 && (
        <ul className="TheMenuMobile__children-list">
          {map(subMenu, ({ Text }, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSubMenuActive(idx);
              }}
              className={classNames("TheMenuMobile__children-item", {
                _active: Number(idx) === subMenuActive,
              })}
            >
              {Text}
            </li>
          ))}
        </ul>
      )}
      <ul className="TheMenuMobile__list">
        {map(
          getSlicedPanels().firstArr || [],
          ({ IconUrl, Text, Children }, idx) => {
            return (
              <li
                onClick={() => handleClick(Number(idx), Children || [])}
                key={idx}
                className={classNames("TheMenuMobile__item", {
                  _active: Number(idx) === activeTab,
                })}
              >
                <div>
                  <Avatar
                    size={19}
                    src={IconUrl}
                    className="TheMenuMobile__icon"
                    icon={
                      <Icon
                        className="TheMenuMobile__icon-default"
                        name="help-filled"
                        size={19}
                      />
                    }
                  />
                </div>
                <span className="TheMenuMobile__tab-name">{Text}</span>
              </li>
            );
          }
        )}
        {(panels || []).length > 5 && (
          <li
            onClick={() => {
              setActiveTab(4);
              setShowExpand(true);
            }}
            className={classNames("TheMenuMobile__item", {
              _active: activeTab === 4,
            })}
          >
            <Icon
              name="action-horizontal"
              size={16}
              className="TheMenuMobile__icon-default"
            />
            <span className="TheMenuMobile__tab-name">More</span>
          </li>
        )}
      </ul>
      {showExpand && (
        <div className="TheMenuMobile__expand">
          <Menu
            {...props}
            getPopupContainer={() =>
              document.getElementById("mainApp") as HTMLElement
            }
            mode="inline"
            theme="light"
          >
            {(panels || []).length &&
              getSlicedPanels().secondArr &&
              renderList(getSlicedPanels().secondArr || [])}
          </Menu>
        </div>
      )}
    </div>
  );
};
