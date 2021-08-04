import styled from "styled-components/native";

import { ButtonVariant, ButtonColor } from "./Button.d";

export const Container = styled.TouchableOpacity<{
  variant: ButtonVariant;
  color: ButtonColor;
}>`
  width: 100%;
  height: 56px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;

  ${({ theme, color, variant }) => {
    if (variant === "outline") {
      return `
        border-width: 2px;
        border-color: ${theme.palette[color].main};
      `;
    }

    if (variant === "transparent") {
      return `
        background: transparent;
      `;
    }

    return `
      background: ${theme.palette[color].main};
    `;
  }}
`;

export const Label = styled.Text<{
  variant: ButtonVariant;
  color: ButtonColor;
}>`
  font-size: 14px;
  font-weight: bold;

  ${({ theme, color, variant }) => {
    if (variant === "outline") {
      return `
        color: ${theme.palette[color].main};
      `;
    }

    if (variant === "transparent") {
      return `
        color: ${theme.palette[color].main};
      `;
    }

    return `
      color: ${theme.palette[color].text};
    `;
  }}
`;
