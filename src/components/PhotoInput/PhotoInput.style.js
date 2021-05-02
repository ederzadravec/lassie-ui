import styled from 'styled-components/native';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Text } from '../Text';

export const Content = styled.View`
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
`;

export const Label = styled(Text)`
  position: absolute;
  font-size: 12px;
  background: transparent;
  width: 100%;
  text-align: ${({ align }) => align};

  color: ${({ hasError, theme, darkTheme }) => {
    if (hasError) return theme.palette.error.main;

    if (darkTheme) return theme.palette.text.light;

    return theme.palette.text.dark;
  }};

  ${({ float, theme }) =>
    float
      ? ''
      : `
    font-size: 14px;
    z-index: 1;
    bottom: ${theme.spacing.unit * 3}px;

  `};
`;

export const InputContainer = styled.View`
  flex: 1;
  height: ${({ theme }) => theme.spacing.unit * 4}px;
  margin-top: ${({ theme }) => theme.spacing.unit * 2}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.palette.colors.grey[400]};
  padding: 0;
  padding-bottom: 4px;
`;

export const Input = styled(Text)`
  margin-top: auto;
  color: ${({ editable, theme, darkTheme }) => {
    if (!editable) return theme.palette.disabled.main;

    if (darkTheme) return theme.palette.text.light;

    return theme.palette.text.dark;
  }};

  font-size: 14px;
  z-index: 2;
  text-align: ${({ align }) => align};
`;

export const IconContent = styled.TouchableOpacity`
  height: 100%;
  width: 44px;
  margin-left: 12px;
  justify-content: center;
  align-items: flex-end;
`;

export const Icon = styled(RNIcon)`
  margin-left: auto;
  color: ${({ theme }) => theme.palette.primary.main};
  font-size: 32px;
`;
