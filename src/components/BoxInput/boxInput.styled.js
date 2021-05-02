import styled from 'styled-components';
import { BaseInput } from '../BaseInput';

export const Container = styled(BaseInput)`
  min-height: ${({ theme }) => theme.spacing.unit * 6}px;
  flex-direction: row;
  align-items: center;
`;

export const BoxContent = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  padding: 8px;
`;

export const Box = styled.View`
  flex: 1;
  padding: 4px;

  border-radius: ${({ variant }) => (variant === 'checkbox' ? 4 : 13)}px;
  border-color: ${({ theme }) => theme.palette.colors.grey[600]};
  border-width: 1px;
`;

export const Check = styled.View`
  flex: 1;
  background: ${({ isChecked, theme }) => (isChecked ? theme.palette.primary.main : 'transparent')};
  border-radius: ${({ variant }) => (variant === 'checkbox' ? 2 : 9)}px;
`;

export const Label = styled.Text`
  margin-left: ${({ theme }) => theme.spacing.unit};
  font-size: 14px;
`;
