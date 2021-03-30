import './TheHeaderProfile.scss';

import { Avatar, Divider, Popover, Row, Switch } from 'antd';
import { Icon, Link } from '../../../common';
import React, { FC, useContext, useState } from 'react';

import { ThemeContext } from '../../../../context/ThemeContext';
import { UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { getShortName } from '../../../../helpers/string';

// import { darkTheme } from '../../../../themes';

interface Props {
  className?: string;
  name?: string;
  avatar?: string;
  email?: string;
}

export const TheHeaderProfile: FC<Props> = ({
  className,
  avatar,
  email,
  name,
}) => {
  const [visible, setVisible] = useState(false);

  const {darkTheme, switchTheme} = useContext(ThemeContext);

  const renderHeader = () => {
    return (
      <Row align="middle" className="TheHeaderProfile__header">
        <Avatar
          icon={<UserOutlined />}
          size={40}
          src={avatar}
          className="TheHeaderProfile__avatar"
        />
        <div className="TheHeaderProfile__name-wrapper">
          <h2 className="TheHeaderProfile__name">{name}</h2>
          <a className="TheHeaderProfile__email" href={`mailto:${email}`}>
            {email}
          </a>
        </div>
      </Row>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="TheHeaderProfile__content">
          <ul>
            <li className="TheHeaderProfile__item">
              <Link icon="preferences">Profile settings</Link>
            </li>
            <li className="TheHeaderProfile__item">
              <Link icon="settings">Preferences</Link>
            </li>
            <li className="TheHeaderProfile__item">
              <Link icon="sign-out">Sign out</Link>
            </li>
          </ul>
        </div>
        <Divider className="TheHeaderProfile__divider _marginless" />
        <Row
          justify="space-between"
          align="middle"
          className="TheHeaderProfile__footer"
        >
          <Link
            onClick={() => switchTheme}
          >
            Dark mode
          </Link>
          <Switch size="small" checked={!!darkTheme} onChange={switchTheme} />
        </Row>
      </>
    );
  };

  return (
    <Popover
      content={renderContent()}
      title={renderHeader()}
      trigger="click"
      className={classNames('TheHeaderProfile', className)}
      overlayClassName="TheHeaderProfile__popover _arrow-none"
      align={{ offset: [0, 0] }}
      visible={visible}
      placement="bottomRight"
      onVisibleChange={setVisible}
      getPopupContainer={() => document.getElementById('mainApp') as HTMLElement}
    >
      <button className={classNames('TheHeaderProfile__button')}>
        <Avatar
          className="TheHeaderProfile__preview-avatar"
          src={avatar}
          icon={<UserOutlined />}
          size={28}
        >
          {name && getShortName(name)}
        </Avatar>
        <Icon name="angle-down" className="TheHeaderProfile__angle-icon" />
      </button>
    </Popover>
  );
};
