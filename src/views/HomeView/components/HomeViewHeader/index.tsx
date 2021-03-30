import "./HomeViewHeader.scss";

import { Breadcrumb, Col, Row } from "antd";
import { Icon, Subtle } from "../../../../components";
import React, { FC } from "react";

import classNames from "classnames";

const { Item } = Breadcrumb;

interface Props {
  className?: string;
}

export const HomeViewHeader: FC<Props> = ({ className }) => {
  return (
    <header className={classNames("HomeViewHeader", className)}>
      <Breadcrumb
        separator={
          <Icon
            name="angle-right"
            className="HomeViewHeader__bread-separator"
            size={16}
          />
        }
        className="HomeViewHeader__breadcrumb"
      >
        <Item href="">Item 1</Item>
        <Item href="">Item 2</Item>
      </Breadcrumb>
      <Row align="middle" gutter={20} className="HomeViewHeader__row">
        <Col className="HomeViewHeader__col">
          <h3 className="HomeViewHeader__title">Agent 007</h3>
        </Col>
        <Col className="HomeViewHeader__col">
          <Subtle icon="reload">Force refresh</Subtle>
        </Col>
        <Col className="HomeViewHeader__col">
          <Subtle icon="eye">Show tasks</Subtle>
        </Col>
      </Row>
    </header>
  );
};
