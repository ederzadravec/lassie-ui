import styled from 'styled-components'

export const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 12px;
  padding-bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
`;

export const Content = styled.View`
  margin-top: auto;
  background: #fff;
  flex-direction: column;
  height: 90%;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
`;

export const SearchInput = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.palette.colors.white};
  height: 40px;
  width: 100%;
  font-size: 18px;
  padding-horizontal: 8px;
  color: #fff;
`;

export const List = styled.FlatList`
  margin-top: 8px;
  flex: 1;
  padding-horizontal: ${({ theme }) => theme.spacing.unit * 3}px;
`;
