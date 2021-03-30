import "./TheHeaderAppDrawerMobile.scss";

import { AvatarBadge, IconButton } from "../../../common";
import React, { FC, useState } from "react";

import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { RootState } from "../../../../store/types";
import classNames from "classnames";
import { filter } from "lodash";
import { useSelector } from "react-redux";

interface Props {
  className?: string;
}

export const TheHeaderAppDrawerMobile: FC<Props> = ({
  className,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const { applicationSuites } = useSelector(
    ({ applicationSuitesState }: RootState) => applicationSuitesState
  );

  const { applications } = useSelector(
    ({ applicationsState }: RootState) => applicationsState
  );

  const renderContent = () => {
    return (
      <ul className="TheHeaderAppDrawerMobile__suites-list">
        {applicationSuites?.slice(0, 1)?.map(
          ({ Id, Name: applicationSuiteName, LogoUrl }) => {
            const applicationsBySuite = filter(
              applications,
              (el) => el?.applicationSuiteId === Id
            );
            return (
              <li className="TheHeaderAppDrawerMobile__suite" key={Id}>
                <AvatarBadge
                  className={"TheHeaderAppDrawerMobile__badge"}
                  name={applicationSuiteName}
                  image={LogoUrl}
                  size={18}
                  fontWeight={500}
                  fontSize={12}
                />
                {
                  <ul className="TheHeaderAppDrawerMobile__applications">
                    {applicationsBySuite.map(({ Id, Name }) => (
                      <li className="TheHeaderAppDrawerMobile__item" key={Id}>
                        <Link
                          to={`/${applicationSuiteName}/${Name}`}
                          className={classNames(
                            "TheHeaderAppDrawerMobile__item-link",
                            {
                              _active: false,
                            }
                          )}
                        >
                          {Name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                }
              </li>
            );
          }
        )}
      </ul>
    );
  };

  return (
    <div className={classNames("TheHeaderAppDrawerMobile", className)}>
      <IconButton
        icon="app"
        className="TheHeaderAppDrawerMobile__btn"
        onClick={() => setVisible(true)}
      />
      <Drawer
        getContainer={'#mainApp'}
        visible={visible}
        placement="left"
        onClose={() => setVisible(false)}
      >
        {renderContent()}
      </Drawer>
    </div>
  );
};
