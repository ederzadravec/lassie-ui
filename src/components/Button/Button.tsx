import React, { FC } from "react";

import { ButtonVariant, ButtonColor } from "./Button.d";
import * as S from "./Button.styled";

export interface ButtonProps {
  /**
   * @default filled
   */
  variant?: ButtonVariant;
  /**
   * @default primary
   */
  color?: ButtonColor;
  loading?: boolean;
  onPress?: () => void;
}

const Component: FC<ButtonProps> = ({
  children,
  variant = "filled",
  color = "primary",
  ...props
}) => {
  return (
    <S.Container {...props} variant={variant} color={color}>
      <S.Label variant={variant} color={color}>
        {children}
      </S.Label>
    </S.Container>
  );
};

export default Component;
