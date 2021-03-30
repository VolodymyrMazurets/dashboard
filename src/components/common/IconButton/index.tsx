import "./IconButton.scss";

import { Icon, IconTypes } from "../Icon";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
} from "react";

import classNames from "classnames";

export const iconButtonTestId = "icon-button";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon: IconTypes;
  size?: number;
}

export const IconButton = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const { icon, className, size = 26, children } = props;

  return (
    <button
      {...props}
      data-testid={iconButtonTestId}
      ref={ref}
      className={classNames("IconButton", className)}
    >
      <Icon size={size} name={icon} className="IconButton__icon" />
      {children && <span className="IconButton__label">{children}</span>}
    </button>
  );
});
