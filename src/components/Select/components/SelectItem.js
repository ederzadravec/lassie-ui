import React from 'react';
import R from 'ramda';
import styled from 'styled-components';

const Container = styled.TouchableOpacity`
  margin-top: 16;
  flex-direction: column;
  padding-horizontal: 8;
  border-bottom-width: 1;
  border-bottom-color:  ${({ theme }) => theme.palette.colors.grey[300]};
  padding-bottom: 16;
`;

const Item = styled.Text`
  padding-top: 8;

  font-size: 18;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Tag = styled.Text`
  padding-top: 8;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export const SelectItem = ({ onPress, item, tags }) => {
  return (
    <Container onPress={() => onPress(item)}>
      <>
        <Item> {item.name} </Item>
        {!R.isEmpty(tags) && <Tag> {Object.values(R.pick(tags, item)).join(' - ')} </Tag>}
      </>
    </Container>
  );
};
