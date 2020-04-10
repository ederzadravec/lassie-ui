import styled from 'styled-components';
import { BaseInput } from '../';

export const Container = styled(BaseInput)`
  min-height: ${({ theme }) => theme.spacing.unit * 6};
  flex-direction: row;
  align-items: center;
`;

export const BoxContent = styled.TouchableOpacity`
  width: 40;
  height: 40;
  padding-vertical: 8;
  padding-horizontal: 8;
`;

export const Box = styled.View`
  flex: 1;
  padding-vertical: 4;
  padding-horizontal: 4;

  border-radius: ${({ variant }) => (variant === 'checkbox' ? 4 : 13)};
  border-color: ${({ theme }) => theme.palette.colors.grey[600]};
  border-width: 1;
`;

export const Check = styled.View`
  flex: 1;
  background: ${({ isChecked, theme }) => (isChecked ? theme.palette.primary.main : 'transparent')};
  border-radius: ${({ variant }) => (variant === 'checkbox' ? 2 : 9)};
`;

export const Label = styled.Text`
  margin-left: ${({ theme }) => theme.spacing.unit};
  font-size: 14;
`;
