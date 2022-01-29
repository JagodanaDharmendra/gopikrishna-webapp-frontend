import React from "react";

import { IconBaseProps } from "react-icons/lib";

enum IconColorType {
  primary,
  gray,
  white,
  black,
  color,
}

interface IProps extends IconBaseProps {
  iconName: string;
  iconColorType?: IconColorType;
  color?: string;
  style?: any;
}

const Icon: React.FC<IProps> = ({
  iconName,
  iconColorType,
  color = undefined,
  style,
  ...rest
}) => {
  let iconColor = "#323232";
  if (iconColorType != undefined) {
    switch (iconColorType) {
      case IconColorType.primary:
        iconColor = "#00DEDE";
        break;
      case IconColorType.gray:
        iconColor = "#A7A7A7";
        break;
      case IconColorType.white:
        iconColor = "#FFF";
        break;
      case IconColorType.black:
        iconColor = "#000";
        break;
    }
  }

  const restProps = {
    style: {
      color: color ?? iconColor,
      ...style,
    },
    ...rest,
  };

  switch (iconName) {
    default:
      return <div />;
  }
};

export { Icon, IconColorType };
