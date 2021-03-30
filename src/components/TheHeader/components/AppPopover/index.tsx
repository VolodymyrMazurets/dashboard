import './TheHeaderAppPopover.scss';

import React, { FC, useState } from 'react';

import { AvatarBadge } from '../../../common';
import { Link } from 'react-router-dom';
import { Popover } from 'antd';
import { RootState } from '../../../../store/types';
import classNames from 'classnames';
import { filter } from 'lodash';
import { useSelector } from 'react-redux';

interface Props {
  className?: string;
}

export const TheHeaderAppPopover: FC<Props> = ({ className, children }) => {
  const [visible, setVisible] = useState(false);

  const { applicationSuites } = useSelector(
    ({ applicationSuitesState }: RootState) => applicationSuitesState
  );

  const { applications } = useSelector(
    ({ applicationsState }: RootState) => applicationsState
  );

  const renderContent = () => {
    return (
      <ul className="TheHeaderAppPopover__suites-list">
        {applicationSuites?.slice(0, 1)?.map(
          ({ Id, Name: applicationSuiteName, LogoUrl }) => {
            const applicationsBySuite = filter(
              applications,
              (el) => el?.applicationSuiteId === Id
            );
            return (
              <li className="TheHeaderAppPopover__suite" key={Id}>
                <AvatarBadge
                  className={'TheHeaderAppPopover__badge'}
                  name={applicationSuiteName}
                  image={LogoUrl}
                  size={18}
                  fontWeight={500}
                  fontSize={12}
                />
                {
                  <ul className="TheHeaderAppPopover__applications">
                    {applicationsBySuite.map(({ Id, Name }) => (
                      <li className="TheHeaderAppPopover__item" key={Id}>
                        <Link
                          to={`/${applicationSuiteName}/${Name}`}
                          className={classNames(
                            'TheHeaderAppPopover__item-link',
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
    <Popover
      content={renderContent()}
      trigger="click"
      className={className}
      overlayClassName="TheHeaderAppPopover _arrow-none"
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
