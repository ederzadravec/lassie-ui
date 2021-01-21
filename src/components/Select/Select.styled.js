import styled from 'styled-components';

import { Text } from '../Text';

export const  TouchableOpacity = styled.TouchableOpacity`
  position: relative;
  flex: 1;
`;

export const  Label = styled(Text)`
  position: absolute;
  font-size: 12px;

  color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.typography.text.color};

  ${({ float, theme }) =>
    float
      ? ''
      : `
    font-size: 14px;
    z-index: 2;
    bottom: ${theme.spacing.unit}px;

  `};
`;

export const  Input = styled.View`
  height: ${({ theme }) => theme.spacing.unit * 4}px;
  margin-top: ${({ theme }) => theme.spacing.unit * 2}px;
  z-index: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${({ hasError, theme }) =>
    hasError ? theme.palette.error.main : theme.palette.colors.grey[400]};

  justify-content: center;
`;

export const  Value = styled(Text)`
  font-size: 14px;
`;

export const  ModalSelect = styled.Modal``;
