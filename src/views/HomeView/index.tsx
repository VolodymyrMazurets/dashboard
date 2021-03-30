import "./HomeView.scss";

import { TheMenu, TheMenuMobile } from "../../components";

import { HomeRouteParams } from "../../router/types";
import { HomeViewHeader } from "./components/HomeViewHeader";
import React from "react";
import { Tabs } from "antd";
import { useParams } from "react-router-dom";

export const HomeView = () => {
  const { suiteId, appId, context } = useParams<HomeRouteParams>();
  const { TabPane } = Tabs;
  return (
    <div className="HomeView">
      <TheMenu className="HomeView__menu" />
      <TheMenuMobile className="HomeView__menu-mobile" />
      <div className="HomeView__wrapper">
        <HomeViewHeader className="HomeView__header" />
        <Tabs defaultActiveKey="1" className="HomeView__tabs">
          <TabPane tab="Tab 1" key="1">
            <h2>{suiteId}</h2>
            <h2>{appId}</h2>
            <h2>{context}</h2>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <h2>{suiteId}</h2>
            <h2>{appId}</h2>
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            <h2>{suiteId}</h2>
            <h2>{appId}</h2>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};
