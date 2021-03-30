import "./TheHeader.scss";

import { Badge, Divider } from "antd";
import {
  DropdownSelect,
  IconButton,
  Loader,
  Logo,
  StatusBadge,
  Subtle,
} from "../common";
import { HomeRouteParams, RouteTypes } from "../../router/types";
import React, { FC, useEffect, useMemo, useState } from "react";
import {
  TheHeaderAppDrawerMobile,
  TheHeaderAppPopover,
  TheHeaderHelpPopover,
  TheHeaderNotificationDrawerMobile,
  TheHeaderNotificationsPopover,
  TheHeaderProfile,
  TheHeaderProfileDrawerMobile,
  TheHeaderSubtlesPopover,
} from "./components";

import { RevisionResponceType } from "../../services/http/types";
import { RootState } from "../../store/types";
import { TheHeaderSearchModal } from "./components/SearchModal";
import { useLoader } from "../../context/LoaderContext";
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";

export const TheHeader: FC = () => {
  const [modalVisibility, setModalVisibility] = useState<boolean>(false);
  const [definition, setDefinition] = useState<string>();
  const [revision, setRevision] = useState<string>();
  const [revisions, setRevisions] = useState<RevisionResponceType[]>();

  const { lineLoader } = useLoader();

  const match = useRouteMatch<HomeRouteParams>(RouteTypes.home);

  const account = useSelector(({ accountState }: RootState) => accountState);

  const { definitions } = useSelector(
    ({ definitionsState }: RootState) => definitionsState
  );

  const { count } = useSelector(
    ({ backgroundTasksState }: RootState) => backgroundTasksState
  );

  const { count: notificationsCount } = useSelector(
    ({ notificationsState }: RootState) => notificationsState
  );

  const applicationName = useMemo(() => match?.params?.appId, [match]);

  const iconNotification = notificationsCount
    ? "notifications-filled-active"
    : "notifications-filled";

  useEffect(() => {
      const item = (definitions || []).find((i) => i.Id === definition)?.Revisions
      setRevisions(item);
      setRevision(undefined);
  }, [definitions, definition]);

  return (
    <header className="TheHeader">
      <div className="TheHeader__main">
        <a href="/" className="TheHeader__logo-wrapper">
          <Logo className="TheHeader__logo" size={26} />
        </a>
        <TheHeaderAppDrawerMobile className="TheHeader__mobile-apps" />
        <TheHeaderAppPopover className="TheHeader__apps">
          <IconButton icon="app" />
        </TheHeaderAppPopover>
        {applicationName && (
          <span className="TheHeader__application-name">{applicationName}</span>
        )}
        <Divider
          style={{ margin: "0 16px 0 24px" }}
          type="vertical"
          className="TheHeader__divider"
        />
        <div className="TheHeader__desktop-dropdowns">
          <DropdownSelect
            style={{ width: "95px" }}
            value={definition}
            onChange={(value) => setDefinition(value)}
            data={definitions}
            placeholder="Definitions"
            className="TheHeader__select"
          />
          <DropdownSelect
            disabled={!definition}
            style={{ width: "95px" }}
            value={revision}
            onChange={(value) => setRevision(value)}
            data={revisions}
            placeholder="Revisions"
            className="TheHeader__select TheHeader__select--last"
          />
        </div>
        <IconButton
          onClick={() => setModalVisibility(true)}
          size={20}
          icon="search"
          className="TheHeader__search"
        >
          Search
        </IconButton>
        <TheHeaderSearchModal
          visible={modalVisibility}
          onCancel={() => setModalVisibility(false)}
        />
      </div>
      <div className="TheHeader__mobile-info">
        <TheHeaderSubtlesPopover>
          <IconButton
            size={20}
            icon="action-horizontal"
            className="TheHeader__mobile-search-btn"
          />
        </TheHeaderSubtlesPopover>
        <IconButton
          size={20}
          icon="search"
          className="TheHeader__mobile-search-btn"
          onClick={() => setModalVisibility(true)}
        />
        <TheHeaderNotificationDrawerMobile className="TheHeader__notification-badge" />
        <TheHeaderProfileDrawerMobile
          avatar={account?.ImageUrl}
          email={account?.MailAddress}
          name={account?.Name}
        />
      </div>
      <div className="TheHeader__info">
        <Subtle className="TheHeader__subtle" icon="notebook">
          Investigate Logs
        </Subtle>
        <Subtle className="TheHeader__subtle">Change</Subtle>
        <Subtle className="TheHeader__subtle">Save</Subtle>
        <Subtle className="TheHeader__subtle">Build</Subtle>
        <IconButton
          icon="action-horizontal"
          className="TheHeader__action-btn"
        />
        <StatusBadge
          count={count || 0}
          type="danger"
          className="TheHeader__notification-badge"
        />
        <IconButton icon="lock" />
        <Divider type="vertical" style={{ margin: "0 20px" }} />
        <TheHeaderHelpPopover className="TheHeader__help-btn">
          <IconButton icon="help-filled" />
        </TheHeaderHelpPopover>
        <TheHeaderNotificationsPopover className="TheHeader__help-btn">
          <Badge
            count={notificationsCount}
            className="TheHeader__notification-btn"
          >
            <IconButton icon={iconNotification} />
          </Badge>
        </TheHeaderNotificationsPopover>
        <TheHeaderProfile
          className="TheHeader__profile"
          avatar={account?.ImageUrl}
          email={account?.MailAddress}
          name={account?.Name}
        />
      </div>
      <Loader
        active={lineLoader.active}
        type="line"
        className="TheHeader__loader"
      />
    </header>
  );
};
