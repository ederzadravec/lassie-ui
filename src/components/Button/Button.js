import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Text } from '../';

const Container = styled.TouchableOpacity`
  height: ${({ theme }) => theme.spacing.unit * 7};
  border-radius: ${({ theme }) => theme.components.button.borderRadius};
  border-color: ${({ theme, color }) => theme.palette[color].main};
  background-color: ${({ theme, color }) => theme.palette[color].main};
  align-items: center;
  justify-content: center;
  border-width: 1;

  ${({ variant, theme }) => {
    if (variant === 'outline')
      return `
        background-color: transparent;
      `;

    if (variant === 'transparent')
      return `
          background-color: transparent;
          border-width: 0;
        `;

    if (variant === 'rounded')
      return `
        border-radius: ${theme.spacing.unit * 7};
      `;
  }}
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.palette.colors.white};
  font-size: 14;
  font-weight: bold;

  ${({ variant, color, theme }) => {
    if (variant === 'outline' || variant === 'transparent')
      return `
        color: ${theme.palette[color].main};
      `;
  }}
`;

export const Button = ({ children, variant, color: colorProp, disabled, onPress }) => {
  const color = disabled ? 'disabled' : colorProp;

  return (
    <Container variant={variant} color={color} disabled={disabled} onPress={onPress}>
      <Label as={Text} variant={variant} color={color}>
        {children}
      </Label>
    </Container>
  );
};

Button.defaultProps = {
  onPress: () => {},
  variant: 'default',
  color: 'primary',
  disabled: false,
};

Button.proptypes = {
  variant: PropTypes.oneOf(['default', 'outline', 'transparent', 'rounded']),
  color: PropTypes.oneOf(['primary', 'error', 'alert', 'success']),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};
