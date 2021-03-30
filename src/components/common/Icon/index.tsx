import React, { DOMAttributes, FC, SVGAttributes } from "react";

import { ReactComponent as IconActionHorizontal } from "../../../assets/svg/ActionHorizontal.svg";
import { ReactComponent as IconAngleDown } from "../../../assets/svg/Angle-down.svg";
import { ReactComponent as IconAngleRight } from "../../../assets/svg/AngleRight.svg";
import { ReactComponent as IconApp } from "../../../assets/svg/Applications.svg";
import { ReactComponent as IconCheck } from "../../../assets/svg/Check.svg";
import { ReactComponent as IconClock } from "../../../assets/svg/Clock.svg";
import { ReactComponent as IconComments } from "../../../assets/svg/Comments.svg";
import { ReactComponent as IconCross } from "../../../assets/svg/Cross.svg";
import { ReactComponent as IconDrrowRight } from "../../../assets/svg/Small-icon-right.svg";
import { ReactComponent as IconExpandLeft } from "../../../assets/svg/Expand-Left.svg";
import { ReactComponent as IconEye } from "../../../assets/svg/Eye.svg";
import { ReactComponent as IconHelp } from "../../../assets/svg/Help.svg";
import { ReactComponent as IconHelpFilled } from "../../../assets/svg/Help-filled.svg";
import { ReactComponent as IconInfo } from "../../../assets/svg/Info in circle.svg";
import { ReactComponent as IconLock } from "../../../assets/svg/Lock.svg";
import { ReactComponent as IconMenuMobile } from "../../../assets/svg/MenuMobile.svg";
import { ReactComponent as IconMoon } from "../../../assets/svg/Moon.svg";
import { ReactComponent as IconNotebook } from "../../../assets/svg/Notebook.svg";
import { ReactComponent as IconNotifications } from "../../../assets/svg/Notifications.svg";
import { ReactComponent as IconNotificationsFilled } from "../../../assets/svg/Notifications-filled.svg";
import { ReactComponent as IconNotificationsFilledActive } from "../../../assets/svg/Notifications-filled-active.svg";
import { ReactComponent as IconPreferences } from "../../../assets/svg/Preferences.svg";
import { ReactComponent as IconQuestion } from "../../../assets/svg/Question.svg";
import { ReactComponent as IconReload } from "../../../assets/svg/Reload.svg";
import { ReactComponent as IconSearch } from "../../../assets/svg/Search.svg";
import { ReactComponent as IconSettings } from "../../../assets/svg/Settings.svg";
import { ReactComponent as IconSignOut } from "../../../assets/svg/Sign-out.svg";
import { ReactComponent as IconSuccessCircle } from "../../../assets/svg/SuccessCircle.svg";
import { ReactComponent as IconSuccessCirclePure } from "../../../assets/svg/SuccessCirclePure.svg";

export const iconTestId = "icon-test";

// Why to do this in typescript? Better for testing all of icons to do snapshots
export const iconsTypes: { [key: string]: IconTypes } = {
  APP: "app",
  SEARCH: "search",
  HELP: "help",
  NOTIFICATIONS: "notifications",
  HELP_FILLED: "help-filled",
  NOTIFICATIONS_FILLED: "notifications-filled",
  NOTIFICATIONS_FILLED_ACTIVE: "notifications-filled-active",
  ANGLE_DOWN: "angle-down",
  CROSS: "cross",
  CLOSE: "close",
  COMMENTS: "comments",
  QUESTION: "question",
  PREFERENCES: "preferences",
  SETTINGS: "settings",
  SIGN_OUT: "sign-out",
  ARROW_RIGHT: "arrow-right",
  SUCCESS_CIRCLE: "success-circle",
  SUCCESS_CIRCLE_PURE: "success-circle-pure",
  INFO: "info",
  LOCK: "lock",
  ACTION_HORIZONTAL: "action-horizontal",
  NOTEBOOK: "notebook",
  CHECK: "check",
  ANGLE_RIGHT: "angle-right",
  EXPAND_LEFT: "expand-left",
  EYE: "eye",
  RELOAD: "reload",
  MENU_MOBILE: "menu-mobile",
  MOON: "moon",
  CLOCK: 'clock',
};

export type IconTypes =
  | "app"
  | "search"
  | "help"
  | "notifications"
  | "help-filled"
  | "notifications-filled"
  | "notifications-filled-active"
  | "angle-down"
  | "cross"
  | "close"
  | "comments"
  | "question"
  | "preferences"
  | "settings"
  | "sign-out"
  | "arrow-right"
  | "success-circle"
  | "success-circle-pure"
  | "info"
  | "lock"
  | "action-horizontal"
  | "notebook"
  | "check"
  | "angle-right"
  | "expand-left"
  | "eye"
  | "reload"
  | "menu-mobile"
  | "moon"
  | "clock";

interface Props {
  className?: string;
  name?: IconTypes;
  size?: number;
  style?: SVGAttributes<SVGSVGElement>["style"];
  onMouseEnter?: DOMAttributes<SVGSVGElement>["onMouseLeave"];
  onMouseLeave?: DOMAttributes<SVGSVGElement>["onMouseLeave"];
}

const getName = (name?: IconTypes) => `icon-${name}`;

export const Icon: FC<Props> = ({
  name,
  className,
  style,
  size = 24,
  onMouseEnter,
  onMouseLeave,
}) => {
  const icons = {
    [getName("app")]: IconApp,
    [getName("search")]: IconSearch,
    [getName("help")]: IconHelp,
    [getName("notifications")]: IconNotifications,
    [getName("help-filled")]: IconHelpFilled,
    [getName("notifications-filled")]: IconNotificationsFilled,
    [getName("notifications-filled-active")]: IconNotificationsFilledActive,
    [getName("angle-down")]: IconAngleDown,
    [getName("close")]: IconCross,
    [getName("cross")]: IconCross,
    [getName("comments")]: IconComments,
    [getName("question")]: IconQuestion,
    [getName("preferences")]: IconPreferences,
    [getName("settings")]: IconSettings,
    [getName("sign-out")]: IconSignOut,
    [getName("arrow-right")]: IconDrrowRight,
    [getName("success-circle")]: IconSuccessCircle,
    [getName("success-circle-pure")]: IconSuccessCirclePure,
    [getName("info")]: IconInfo,
    [getName("lock")]: IconLock,
    [getName("action-horizontal")]: IconActionHorizontal,
    [getName("notebook")]: IconNotebook,
    [getName("check")]: IconCheck,
    [getName("angle-right")]: IconAngleRight,
    [getName("expand-left")]: IconExpandLeft,
    [getName("eye")]: IconEye,
    [getName("reload")]: IconReload,
    [getName("menu-mobile")]: IconMenuMobile,
    [getName("moon")]: IconMoon,
    [getName("clock")]: IconClock,
  };

  const IconComponent = icons[getName(name)] || null;

  const sizeStyle = size && { width: size, height: size };

  return (
    IconComponent && (
      <IconComponent
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-testid={iconTestId}
        className={className}
        style={{ ...style, ...sizeStyle }}
      />
    )
  );
};

export default Icon;
