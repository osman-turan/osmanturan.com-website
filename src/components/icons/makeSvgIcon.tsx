import React, { ReactElement, SVGAttributes } from "react";
import classNames from "classnames";

export function makeSvgIcon(
  element: ReactElement<SVGAttributes<SVGElement>>
): React.FC {
  return function SvgIcon({
    className,
    ...props
  }: SVGAttributes<SVGElement>): JSX.Element {
    return React.cloneElement(element, {
      className: classNames("svg-icon", className),
      ...props,
    });
  };
}
