import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '../';

const Container = styled.TouchableOpacity`
  height: ${({ theme }) => theme.spacing.unit * 7};
  border-radius: ${({ theme }) => theme.components.button.borderRadius};
  border-color: ${({ theme, color }) => theme.palette[color].main};
  background-color: ${({ theme, color }) => theme.palette[color].main};
  align-items: center;
  justify-content: center;
  border-width: 1;

  flex-direction: row;

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
  color: ${({ theme, color }) => theme.palette[color].text};
  font-size: 14;
  font-weight: bold;

  justify-content: center;
  align-items: center;
  align-self: center;

  ${({ variant, color, theme }) => {
    if (variant === 'outline' || variant === 'transparent')
      return `
        color: ${theme.palette[color].main};
      `;
  }}
`;

const ButtonIcon = styled(RNIcon)`
  font-size: 30;
  color: ${({ theme, color }) => theme.palette[color].text};

  ${({ margin, theme }) => `margin-${margin}: ${theme.spacing.unit}`};

  ${({ variant, color, theme }) => {
    if (variant === 'outline' || variant === 'transparent')
      return `
        color: ${theme.palette[color].main};
      `;
  }}
`;

export const Button = ({
  children,
  variant,
  color: colorProp,
  disabled,
  onPress,
  iconBefore,
  iconAfter,
  ...props
}) => {
  const color = disabled ? 'disabled' : colorProp;

  return (
    <Container {...props} variant={variant} color={color} disabled={disabled} onPress={onPress}>
      {iconBefore && (
        <ButtonIcon name={iconBefore} variant={variant} color={color} margin="right" />
      )}

      <Label as={Text} variant={variant} color={color}>
        {children}
      </Label>

      {iconAfter && (
        <ButtonIcon name={iconAfter} variant={variant} color={color} margin="left" />
      )}
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
  color: PropTypes.oneOf(['primary', 'error', 'alert', 'success', 'white', 'secondary']),
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string,
};
