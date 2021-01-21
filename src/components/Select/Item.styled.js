import styled from 'styled-components';

export const Container = styled.TouchableOpacity`
  margin-top: 16px;
  flex-direction: column;
  padding-horizontal: 8px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.palette.colors.grey[300]};
  padding-bottom: 16px;
`;

export const Item = styled.Text`
  padding-top: 8px;

  font-size: 18px;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const Tag = styled.Text`
  padding-top: 8px;
  color: ${({ theme }) => theme.palette.grey[700]};
`;
