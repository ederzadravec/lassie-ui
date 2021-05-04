import React from 'react';
import R from 'ramda';

import * as S from './Item.styled';

export const Item = ({ onPress, item, tags, selected }) => {
  return (
    <S.Container onPress={() => onPress(item)}>
      <>
        <S.Item bold={selected}> {item.name} </S.Item>
        {!R.isEmpty(tags) && <S.Tag> {Object.values(R.pick(tags, item)).join(' - ')} </S.Tag>}
      </>
    </S.Container>
  );
};
